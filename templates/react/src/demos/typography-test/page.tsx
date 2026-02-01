export default function TypographyTest() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-background text-foreground">
      <div className="mb-8">
        <div className="text-2xl font-semibold mb-6 text-foreground">
          Typography Scale Test
        </div>

        <div className="space-y-4">
          <div className="text-xs text-foreground">text-xs - 10px</div>
          <div className="text-sm text-foreground">text-sm - 12px</div>
          <div className="text-md text-foreground">text-md - 14px</div>
          <div className="text-base text-foreground">text-base - 14px</div>
          <div className="text-lg text-foreground">text-lg - 16px</div>
          <div className="text-xl text-foreground">text-xl - 18px</div>
          <div className="text-2xl text-foreground">text-2xl - 20px</div>
          <div className="text-3xl text-foreground">text-3xl - 24px</div>
          <div className="text-4xl text-foreground">text-4xl - 36px</div>
          <div className="text-5xl text-foreground">text-5xl - 48px</div>
          <div className="text-6xl text-foreground">text-6xl - 60px</div>
          <div className="text-7xl text-foreground">text-7xl - 72px</div>
          <div className="text-8xl text-foreground">text-8xl - 96px</div>
          <div className="text-9xl text-foreground">text-9xl - 128px</div>
        </div>
      </div>
    </div>
  );
}