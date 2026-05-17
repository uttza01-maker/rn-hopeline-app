// app/_layout.tsx
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        // ซ่อนแถบ Header ด้านบนของทุกหน้าจอ เพื่อให้แสดงผลเต็มจอตามดีไซน์เป๊ะๆ
        headerShown: false,
        // เพิ่ม Animation เวลาเปลี่ยนหน้าให้เนียนตาขึ้น (สำหรับ Android/iOS)
        animation: "fade",
      }}
    >
      {/* หน้าแรกสุด (Splash Screen) */}
      <Stack.Screen name="index" />

      {/* หน้าเข้าสู่ระบบ */}
      <Stack.Screen name="signin" />

      {/* หน้าสมัครสมาชิก */}
      <Stack.Screen name="signup" />
    </Stack>
  );
}
