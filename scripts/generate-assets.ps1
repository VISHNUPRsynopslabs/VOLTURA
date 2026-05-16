Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"
$assetsDir = Join-Path $PSScriptRoot "..\public\assets"
New-Item -ItemType Directory -Force $assetsDir | Out-Null

function Color-Hex($hex, [int]$alpha = 255) {
  $color = [System.Drawing.ColorTranslator]::FromHtml($hex)
  return [System.Drawing.Color]::FromArgb($alpha, $color.R, $color.G, $color.B)
}

function New-RoundRectPath([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $path.AddArc($x, $y, $d, $d, 180, 90)
  $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  return $path
}

function Fill-Path($g, $path, $hex, [int]$alpha = 255) {
  $brush = New-Object System.Drawing.SolidBrush (Color-Hex $hex $alpha)
  $g.FillPath($brush, $path)
  $brush.Dispose()
}

function Fill-Polygon($g, $points, $hex, [int]$alpha = 255) {
  $brush = New-Object System.Drawing.SolidBrush (Color-Hex $hex $alpha)
  $g.FillPolygon($brush, [System.Drawing.PointF[]]$points)
  $brush.Dispose()
}

function Fill-Ellipse($g, [float]$x, [float]$y, [float]$w, [float]$h, $hex, [int]$alpha = 255) {
  $brush = New-Object System.Drawing.SolidBrush (Color-Hex $hex $alpha)
  $g.FillEllipse($brush, $x, $y, $w, $h)
  $brush.Dispose()
}

function Fill-Rectangle($g, [float]$x, [float]$y, [float]$w, [float]$h, $hex, [int]$alpha = 255) {
  $brush = New-Object System.Drawing.SolidBrush (Color-Hex $hex $alpha)
  $g.FillRectangle($brush, $x, $y, $w, $h)
  $brush.Dispose()
}

function Draw-Background($g, [int]$w, [int]$h, $palette, [int]$variant) {
  $rect = New-Object System.Drawing.Rectangle 0, 0, $w, $h
  $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $rect, (Color-Hex $palette.bg1), (Color-Hex $palette.bg2), (35 + $variant * 18)
  $g.FillRectangle($brush, $rect)
  $brush.Dispose()

  $band = @(
    [System.Drawing.PointF]::new($w * -0.1, $h * (0.18 + $variant * 0.04)),
    [System.Drawing.PointF]::new($w * 1.08, $h * (0.02 + $variant * 0.03)),
    [System.Drawing.PointF]::new($w * 1.12, $h * (0.18 + $variant * 0.05)),
    [System.Drawing.PointF]::new($w * -0.08, $h * (0.36 + $variant * 0.02))
  )
  Fill-Polygon $g $band $palette.light 34

  $shadow = New-Object System.Drawing.Drawing2D.LinearGradientBrush $rect, (Color-Hex "#000000" 12), (Color-Hex "#000000" 155), 90
  $g.FillRectangle($shadow, 0, $h * 0.55, $w, $h * 0.45)
  $shadow.Dispose()

  Fill-Rectangle $g 0 ($h * 0.78) $w ($h * 0.22) "#000000" 42

  $rand = [System.Random]::new(1780 + $variant)
  $pen = New-Object System.Drawing.Pen (Color-Hex $palette.light 15), 1
  for ($i = 0; $i -lt 180; $i++) {
    $x = $rand.NextDouble() * $w
    $y = $rand.NextDouble() * $h
    $g.DrawLine($pen, [float]$x, [float]$y, [float]($x + $rand.NextDouble() * 28), [float]($y + $rand.NextDouble() * 7))
  }
  $pen.Dispose()
}

function Draw-Shoe($g, [int]$w, [int]$h, $palette, [int]$variant) {
  $cx = $w * 0.5
  $cy = $h * 0.58
  $scale = [Math]::Min($w, $h) / 800
  $sole = New-RoundRectPath ($cx - 250 * $scale) ($cy + 100 * $scale) (520 * $scale) (72 * $scale) (32 * $scale)
  Fill-Path $g $sole $palette.dark 245
  $mid = New-RoundRectPath ($cx - 220 * $scale) ($cy + 82 * $scale) (470 * $scale) (58 * $scale) (26 * $scale)
  Fill-Path $g $mid $palette.light 230

  $upper = New-Object System.Drawing.Drawing2D.GraphicsPath
  $upper.StartFigure()
  $upper.AddBezier(($cx - 230 * $scale), ($cy + 90 * $scale), ($cx - 160 * $scale), ($cy - 80 * $scale), ($cx + 80 * $scale), ($cy - 112 * $scale), ($cx + 236 * $scale), ($cy + 54 * $scale))
  $upper.AddLine(($cx + 236 * $scale), ($cy + 54 * $scale), ($cx + 190 * $scale), ($cy + 100 * $scale))
  $upper.AddLine(($cx + 190 * $scale), ($cy + 100 * $scale), ($cx - 220 * $scale), ($cy + 100 * $scale))
  $upper.CloseFigure()
  Fill-Path $g $upper $palette.main 245

  $accent = New-Object System.Drawing.Pen (Color-Hex $palette.accent 230), (8 * $scale)
  for ($i = 0; $i -lt 5; $i++) {
    $x = $cx - 80 * $scale + ($i * 36 * $scale)
    $g.DrawLine($accent, [float]$x, [float]($cy - 12 * $scale), [float]($x + 46 * $scale), [float]($cy + 28 * $scale))
  }
  $accent.Dispose()
}

function Draw-Jacket($g, [int]$w, [int]$h, $palette, [int]$variant) {
  $cx = $w * 0.5
  $top = $h * 0.23
  $scale = [Math]::Min($w, $h) / 800
  Fill-Ellipse $g ($cx - 70 * $scale) ($top - 12 * $scale) (140 * $scale) (92 * $scale) $palette.dark 230
  $body = @(
    [System.Drawing.PointF]::new($cx - 150 * $scale, $top + 60 * $scale),
    [System.Drawing.PointF]::new($cx + 150 * $scale, $top + 60 * $scale),
    [System.Drawing.PointF]::new($cx + 208 * $scale, $top + 500 * $scale),
    [System.Drawing.PointF]::new($cx - 208 * $scale, $top + 500 * $scale)
  )
  Fill-Polygon $g $body $palette.main 246
  $leftSleeve = @(
    [System.Drawing.PointF]::new($cx - 150 * $scale, $top + 90 * $scale),
    [System.Drawing.PointF]::new($cx - 285 * $scale, $top + 230 * $scale),
    [System.Drawing.PointF]::new($cx - 250 * $scale, $top + 468 * $scale),
    [System.Drawing.PointF]::new($cx - 160 * $scale, $top + 380 * $scale)
  )
  $rightSleeve = @(
    [System.Drawing.PointF]::new($cx + 150 * $scale, $top + 90 * $scale),
    [System.Drawing.PointF]::new($cx + 285 * $scale, $top + 230 * $scale),
    [System.Drawing.PointF]::new($cx + 250 * $scale, $top + 468 * $scale),
    [System.Drawing.PointF]::new($cx + 160 * $scale, $top + 380 * $scale)
  )
  Fill-Polygon $g $leftSleeve $palette.dark 238
  Fill-Polygon $g $rightSleeve $palette.dark 238
  $zip = New-Object System.Drawing.Pen (Color-Hex $palette.light 190), (5 * $scale)
  $g.DrawLine($zip, [float]$cx, [float]($top + 92 * $scale), [float]$cx, [float]($top + 488 * $scale))
  $zip.Dispose()
  Fill-Rectangle $g ($cx - 170 * $scale) ($top + 310 * $scale) (120 * $scale) (8 * $scale) $palette.accent 210
  Fill-Rectangle $g ($cx + 50 * $scale) ($top + 310 * $scale) (120 * $scale) (8 * $scale) $palette.accent 210
}

function Draw-Pants($g, [int]$w, [int]$h, $palette, [int]$variant) {
  $cx = $w * 0.5
  $top = $h * 0.22
  $scale = [Math]::Min($w, $h) / 800
  Fill-Rectangle $g ($cx - 130 * $scale) $top (260 * $scale) (70 * $scale) $palette.dark 240
  $left = @(
    [System.Drawing.PointF]::new($cx - 128 * $scale, $top + 65 * $scale),
    [System.Drawing.PointF]::new($cx - 12 * $scale, $top + 65 * $scale),
    [System.Drawing.PointF]::new($cx - 40 * $scale, $top + 560 * $scale),
    [System.Drawing.PointF]::new($cx - 170 * $scale, $top + 560 * $scale)
  )
  $right = @(
    [System.Drawing.PointF]::new($cx + 12 * $scale, $top + 65 * $scale),
    [System.Drawing.PointF]::new($cx + 128 * $scale, $top + 65 * $scale),
    [System.Drawing.PointF]::new($cx + 170 * $scale, $top + 560 * $scale),
    [System.Drawing.PointF]::new($cx + 40 * $scale, $top + 560 * $scale)
  )
  Fill-Polygon $g $left $palette.main 245
  Fill-Polygon $g $right $palette.main 245
  Fill-Rectangle $g ($cx - 166 * $scale) ($top + 258 * $scale) (92 * $scale) (70 * $scale) $palette.dark 122
  Fill-Rectangle $g ($cx + 74 * $scale) ($top + 258 * $scale) (92 * $scale) (70 * $scale) $palette.dark 122
}

function Draw-Tee($g, [int]$w, [int]$h, $palette, [int]$variant) {
  $cx = $w * 0.5
  $top = $h * 0.26
  $scale = [Math]::Min($w, $h) / 800
  $shirt = @(
    [System.Drawing.PointF]::new($cx - 120 * $scale, $top),
    [System.Drawing.PointF]::new($cx - 270 * $scale, $top + 98 * $scale),
    [System.Drawing.PointF]::new($cx - 214 * $scale, $top + 220 * $scale),
    [System.Drawing.PointF]::new($cx - 142 * $scale, $top + 170 * $scale),
    [System.Drawing.PointF]::new($cx - 165 * $scale, $top + 500 * $scale),
    [System.Drawing.PointF]::new($cx + 165 * $scale, $top + 500 * $scale),
    [System.Drawing.PointF]::new($cx + 142 * $scale, $top + 170 * $scale),
    [System.Drawing.PointF]::new($cx + 214 * $scale, $top + 220 * $scale),
    [System.Drawing.PointF]::new($cx + 270 * $scale, $top + 98 * $scale),
    [System.Drawing.PointF]::new($cx + 120 * $scale, $top)
  )
  Fill-Polygon $g $shirt $palette.main 248
  Fill-Ellipse $g ($cx - 68 * $scale) ($top - 18 * $scale) (136 * $scale) (82 * $scale) $palette.dark 120
  Fill-Rectangle $g ($cx - 118 * $scale) ($top + 300 * $scale) (236 * $scale) (9 * $scale) $palette.accent 210
}

function Draw-Hoodie($g, [int]$w, [int]$h, $palette, [int]$variant) {
  $cx = $w * 0.5
  $top = $h * 0.18
  $scale = [Math]::Min($w, $h) / 800
  Fill-Ellipse $g ($cx - 120 * $scale) $top (240 * $scale) (190 * $scale) $palette.dark 242
  $body = New-RoundRectPath ($cx - 190 * $scale) ($top + 130 * $scale) (380 * $scale) (460 * $scale) (42 * $scale)
  Fill-Path $g $body $palette.main 248
  $pocket = New-RoundRectPath ($cx - 116 * $scale) ($top + 380 * $scale) (232 * $scale) (86 * $scale) (22 * $scale)
  Fill-Path $g $pocket $palette.dark 118
  $cord = New-Object System.Drawing.Pen (Color-Hex $palette.light 180), (5 * $scale)
  $g.DrawLine($cord, [float]($cx - 44 * $scale), [float]($top + 160 * $scale), [float]($cx - 64 * $scale), [float]($top + 262 * $scale))
  $g.DrawLine($cord, [float]($cx + 44 * $scale), [float]($top + 160 * $scale), [float]($cx + 64 * $scale), [float]($top + 262 * $scale))
  $cord.Dispose()
}

function Draw-Bag($g, [int]$w, [int]$h, $palette, [int]$variant) {
  $cx = $w * 0.5
  $cy = $h * 0.58
  $scale = [Math]::Min($w, $h) / 800
  $bag = New-RoundRectPath ($cx - 255 * $scale) ($cy - 120 * $scale) (510 * $scale) (260 * $scale) (48 * $scale)
  Fill-Path $g $bag $palette.main 248
  $handlePen = New-Object System.Drawing.Pen (Color-Hex $palette.dark 240), (24 * $scale)
  $g.DrawArc($handlePen, [float]($cx - 115 * $scale), [float]($cy - 230 * $scale), [float](230 * $scale), [float](180 * $scale), 200, 140)
  $handlePen.Dispose()
  Fill-Rectangle $g ($cx - 230 * $scale) ($cy - 16 * $scale) (460 * $scale) (10 * $scale) $palette.accent 220
  Fill-Rectangle $g ($cx + 126 * $scale) ($cy - 120 * $scale) (58 * $scale) (260 * $scale) $palette.dark 130
}

function Draw-Model($g, [int]$w, [int]$h, $palette, [int]$variant) {
  $cx = $w * (0.46 + $variant * 0.05)
  $top = $h * 0.18
  $scale = [Math]::Min($w, $h) / 900
  Fill-Ellipse $g ($cx - 48 * $scale) $top (96 * $scale) (96 * $scale) $palette.light 220
  $torso = @(
    [System.Drawing.PointF]::new($cx - 96 * $scale, $top + 120 * $scale),
    [System.Drawing.PointF]::new($cx + 105 * $scale, $top + 118 * $scale),
    [System.Drawing.PointF]::new($cx + 168 * $scale, $top + 455 * $scale),
    [System.Drawing.PointF]::new($cx - 142 * $scale, $top + 455 * $scale)
  )
  Fill-Polygon $g $torso $palette.main 238
  $armPen = New-Object System.Drawing.Pen (Color-Hex $palette.dark 230), (44 * $scale)
  $g.DrawLine($armPen, [float]($cx - 92 * $scale), [float]($top + 165 * $scale), [float]($cx - 270 * $scale), [float]($top + 370 * $scale))
  $g.DrawLine($armPen, [float]($cx + 92 * $scale), [float]($top + 165 * $scale), [float]($cx + 255 * $scale), [float]($top + 330 * $scale))
  $armPen.Dispose()
  $legPen = New-Object System.Drawing.Pen (Color-Hex $palette.dark 240), (56 * $scale)
  $g.DrawLine($legPen, [float]($cx - 58 * $scale), [float]($top + 432 * $scale), [float]($cx - 150 * $scale), [float]($top + 780 * $scale))
  $g.DrawLine($legPen, [float]($cx + 58 * $scale), [float]($top + 432 * $scale), [float]($cx + 210 * $scale), [float]($top + 750 * $scale))
  $legPen.Dispose()
  Fill-Rectangle $g ($cx - 158 * $scale) ($top + 600 * $scale) (310 * $scale) (12 * $scale) $palette.accent 230
}

function New-Asset($name, [int]$w, [int]$h, $kind, $palette, [int]$variant = 0) {
  $file = Join-Path $assetsDir $name
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

  Draw-Background $g $w $h $palette $variant
  switch ($kind) {
    "shoe" { Draw-Shoe $g $w $h $palette $variant }
    "jacket" { Draw-Jacket $g $w $h $palette $variant }
    "pants" { Draw-Pants $g $w $h $palette $variant }
    "tee" { Draw-Tee $g $w $h $palette $variant }
    "hoodie" { Draw-Hoodie $g $w $h $palette $variant }
    "bag" { Draw-Bag $g $w $h $palette $variant }
    default { Draw-Model $g $w $h $palette $variant }
  }

  $bmp.Save($file, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

$palettes = @{
  carbon = @{ bg1 = "#0b0b0b"; bg2 = "#2c2d2a"; main = "#121212"; dark = "#050505"; light = "#f3f1e9"; accent = "#c46a41" }
  fog = @{ bg1 = "#f2f0ea"; bg2 = "#9a9c93"; main = "#f7f6f0"; dark = "#151515"; light = "#ffffff"; accent = "#c46a41" }
  clay = @{ bg1 = "#c46a41"; bg2 = "#2a2a28"; main = "#222222"; dark = "#090909"; light = "#f7efe5"; accent = "#f2d2be" }
  moss = @{ bg1 = "#687061"; bg2 = "#121412"; main = "#1b1f1b"; dark = "#050705"; light = "#eef0e8"; accent = "#c46a41" }
  stone = @{ bg1 = "#8d8f88"; bg2 = "#e8e5dc"; main = "#202020"; dark = "#070707"; light = "#ffffff"; accent = "#c46a41" }
}

New-Asset "hero-velocity.png" 1800 1100 "model" $palettes.carbon 0
New-Asset "hero-uniform.png" 1800 1100 "model" $palettes.moss 1
New-Asset "hero-carbon.png" 1800 1100 "model" $palettes.clay 2
New-Asset "promo-run.png" 1400 1200 "model" $palettes.stone 1
New-Asset "promo-street.png" 1400 1200 "model" $palettes.carbon 2

New-Asset "category-footwear.png" 1200 1500 "shoe" $palettes.fog 0
New-Asset "category-outerwear.png" 1200 1500 "jacket" $palettes.carbon 1
New-Asset "category-training.png" 1200 1500 "model" $palettes.moss 0
New-Asset "category-lifestyle.png" 1200 1500 "hoodie" $palettes.stone 1
New-Asset "category-accessories.png" 1200 1500 "bag" $palettes.clay 0

$products = @(
  @{ slug = "aero-knit-runner"; kind = "shoe"; palette = $palettes.fog },
  @{ slug = "carbon-zip-track-jacket"; kind = "jacket"; palette = $palettes.carbon },
  @{ slug = "tempo-sculpt-legging"; kind = "pants"; palette = $palettes.moss },
  @{ slug = "pulse-training-tee"; kind = "tee"; palette = $palettes.fog },
  @{ slug = "street-flex-cargo"; kind = "pants"; palette = $palettes.carbon },
  @{ slug = "orbit-court-sneaker"; kind = "shoe"; palette = $palettes.stone },
  @{ slug = "thermal-cloud-hoodie"; kind = "hoodie"; palette = $palettes.fog },
  @{ slug = "nova-mesh-windbreaker"; kind = "jacket"; palette = $palettes.stone },
  @{ slug = "altitude-thermal-gilet"; kind = "jacket"; palette = $palettes.moss },
  @{ slug = "cadence-knit-short"; kind = "pants"; palette = $palettes.clay },
  @{ slug = "form-curve-bra"; kind = "tee"; palette = $palettes.moss },
  @{ slug = "motion-carry-duffle"; kind = "bag"; palette = $palettes.carbon }
)

foreach ($product in $products) {
  for ($i = 1; $i -le 3; $i++) {
    New-Asset "$($product.slug)-$i.png" 1200 1500 $product.kind $product.palette ($i - 1)
  }
}

Write-Output "Generated assets in $assetsDir"
