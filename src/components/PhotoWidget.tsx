import { Ionicons } from '@expo/vector-icons';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../hooks/useTheme';
import { scanHomework } from '../lib/scanApi';
import type { ScanResult } from '../lib/scanTypes';
import { radius, spacing } from '../theme';
import { ScanResults } from './ScanResults';
import { Button, Card, SectionTitle, styles as ui } from './ui';

const PICKER_OPTIONS: ImagePicker.ImagePickerOptions = {
  mediaTypes: ['images'],
  allowsEditing: true,
  quality: 0.8,
  preferredAssetRepresentationMode: ImagePicker.UIImagePickerPreferredAssetRepresentationMode.Compatible,
};

// Photos are downscaled before upload: keeps requests under hosting body limits (e.g. Vercel ~4.5 MB)
// and makes scans faster. 1600px on the long side is plenty for reading homework.
const MAX_DIMENSION = 1600;

type ScanState =
  | { status: 'idle' }
  | { status: 'scanning' }
  | { status: 'done'; result: ScanResult }
  | { status: 'error'; message: string };

function notify(title: string, message: string) {
  if (Platform.OS === 'web') window.alert(`${title}\n\n${message}`);
  else Alert.alert(title, message);
}

/** Resize (if needed) and re-encode as JPEG, returning base64 for the scan API. */
async function toPayload(asset: ImagePicker.ImagePickerAsset) {
  const context = ImageManipulator.manipulate(asset.uri);
  const { width = 0, height = 0 } = asset;
  if (Math.max(width, height) > MAX_DIMENSION) {
    context.resize(width >= height ? { width: MAX_DIMENSION } : { height: MAX_DIMENSION });
  }
  const image = await context.renderAsync();
  const result = await image.saveAsync({ format: SaveFormat.JPEG, compress: 0.7, base64: true });
  const base64 = result.base64 ?? /^data:[^;]+;base64,(.*)$/.exec(result.uri)?.[1];
  if (!base64) throw new Error('Could not read the image. Please try another photo.');
  return { imageBase64: base64, mimeType: 'image/jpeg' };
}

export function PhotoWidget() {
  const { colors } = useTheme();
  const [photo, setPhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [scan, setScan] = useState<ScanState>({ status: 'idle' });
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const selectPhoto = (asset: ImagePicker.ImagePickerAsset | null) => {
    abortRef.current?.abort();
    setPhoto(asset);
    setScan({ status: 'idle' });
  };

  const takePhoto = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      notify('Camera access needed', 'Allow camera access in your device settings to snap your homework.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync(PICKER_OPTIONS);
    if (!result.canceled) selectPhoto(result.assets[0]);
  };

  const uploadPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync(PICKER_OPTIONS);
    if (!result.canceled) selectPhoto(result.assets[0]);
  };

  const runScan = async () => {
    if (!photo) return;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setScan({ status: 'scanning' });
    try {
      const result = await scanHomework(await toPayload(photo), controller.signal);
      setScan({ status: 'done', result });
    } catch (e) {
      if (controller.signal.aborted) return;
      setScan({ status: 'error', message: e instanceof Error ? e.message : 'Something went wrong.' });
    }
  };

  const cancelScan = () => {
    abortRef.current?.abort();
    setScan({ status: 'idle' });
  };

  const scanning = scan.status === 'scanning';

  return (
    <Card>
      <SectionTitle>Snap your homework</SectionTitle>

      {photo ? (
        <View style={{ gap: spacing.md }}>
          <View style={[s.previewWrap, { backgroundColor: colors.surfaceAlt }]}>
            <Image
              source={{ uri: photo.uri }}
              style={[s.preview, { aspectRatio: photo.width && photo.height ? photo.width / photo.height : 4 / 3 }]}
              resizeMode="contain"
              accessibilityLabel="Preview of your homework photo"
            />
            {scanning && (
              <View style={s.overlay}>
                <ActivityIndicator size="large" color="#FFFFFF" />
                <Text style={s.overlayText}>Reading & solving your homework…</Text>
              </View>
            )}
            {!scanning && (
              <Pressable
                onPress={() => selectPhoto(null)}
                style={[s.remove, { backgroundColor: colors.surface }]}
                hitSlop={8}
                accessibilityLabel="Remove photo"
              >
                <Ionicons name="close" size={18} color={colors.text} />
              </Pressable>
            )}
          </View>

          {scanning ? (
            <Button label="Cancel" icon="stop-circle-outline" variant="secondary" onPress={cancelScan} />
          ) : (
            <>
              <Button
                label={scan.status === 'done' ? 'Scan again' : 'Scan & solve'}
                icon="sparkles"
                onPress={runScan}
              />
              <View style={s.actions}>
                <Button label="Retake" icon="camera-outline" variant="secondary" onPress={takePhoto} style={{ flex: 1 }} />
                <Button label="Replace" icon="images-outline" variant="secondary" onPress={uploadPhoto} style={{ flex: 1 }} />
              </View>
            </>
          )}

          {scan.status === 'error' && (
            <View style={[s.error, { backgroundColor: colors.dangerSoft }]}>
              <Ionicons name="alert-circle" size={18} color={colors.danger} />
              <Text style={{ color: colors.danger, flex: 1, lineHeight: 20 }}>{scan.message}</Text>
            </View>
          )}

          {scan.status === 'done' && <ScanResults result={scan.result} />}
        </View>
      ) : (
        <View style={[s.dropzone, { borderColor: colors.border, backgroundColor: colors.surfaceAlt }]}>
          <View style={[s.dropIcon, { backgroundColor: colors.primarySoft }]}>
            <Ionicons name="scan-outline" size={28} color={colors.primary} />
          </View>
          <Text style={[ui.muted, { color: colors.textMuted, textAlign: 'center' }]}>
            Take a photo of a math problem or upload one, and AI will solve it step by step.
          </Text>
          <View style={s.actions}>
            <Button label="Take photo" icon="camera" onPress={takePhoto} style={{ flex: 1 }} />
            <Button label="Upload" icon="images" variant="secondary" onPress={uploadPhoto} style={{ flex: 1 }} />
          </View>
        </View>
      )}
    </Card>
  );
}

const s = StyleSheet.create({
  dropzone: {
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderStyle: 'dashed',
  },
  dropIcon: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  actions: { flexDirection: 'row', gap: spacing.sm, alignSelf: 'stretch' },
  previewWrap: { borderRadius: radius.md, overflow: 'hidden' },
  preview: { width: '100%', maxHeight: 360 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(14, 16, 32, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  overlayText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  remove: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center', padding: spacing.md, borderRadius: radius.md },
});
