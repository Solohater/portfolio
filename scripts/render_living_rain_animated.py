import math, random, subprocess
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

W, H = 1280, 720
FPS = 25
DURATION = 12.0
TOTAL_FRAMES = int(FPS * DURATION)

img_path = '/home/etechsc/.gemini/antigravity/brain/630aac9f-f098-4037-b5bd-56651ae7dbad/animated_rainy_house_1789200159075.jpg'
base_img = Image.open(img_path).convert('RGB')
PAD = 24
base_w, base_h = W + PAD * 2, H + PAD * 2
base = base_img.resize((base_w, base_h), Image.Resampling.LANCZOS)

# 1. Rain streaks setup
random.seed(8888)
num_streaks = 900
streaks = []
angle_rad = math.radians(7.5) # wind slant
dx_factor = math.tan(angle_rad)

for _ in range(num_streaks):
    layer = random.choices([0, 1, 2], weights=[0.25, 0.45, 0.30])[0]
    if layer == 0:
        length = random.uniform(24, 36)
        vy = random.uniform(680, 900)
        alpha = random.randint(140, 210)
        width = 2
    elif layer == 1:
        length = random.uniform(16, 25)
        vy = random.uniform(520, 700)
        alpha = random.randint(90, 150)
        width = 1
    else:
        length = random.uniform(10, 16)
        vy = random.uniform(380, 540)
        alpha = random.randint(50, 100)
        width = 1

    cycles = max(2, round(vy * DURATION / (H + 60)))
    vy = cycles * (H + 60) / DURATION
    x0 = random.uniform(-60, W + 60)
    y0 = random.uniform(-30, H + 30)
    streaks.append({
        'x0': x0, 'y0': y0, 'length': length, 'vy': vy,
        'alpha': alpha, 'width': width, 'layer': layer
    })

# 2. Puddle ripples on cobblestones (y in 530..710)
num_ripples = 40
ripples = []
for _ in range(num_ripples):
    rx = random.uniform(240, 1050)
    ry = random.uniform(530, 710)
    period = random.choice([1.5, 2.0, 3.0])
    phase = random.uniform(0, 2 * math.pi)
    max_r = random.uniform(8, 18)
    ripples.append({'x': rx, 'y': ry, 'period': period, 'phase': phase, 'max_r': max_r})

# 3. Chimney smoke particles drifting in wind (x ~ 860, y ~ 160 in base)
num_smoke = 24
smoke_particles = []
for _ in range(num_smoke):
    cycle = random.uniform(2.5, 4.0)
    phase = random.uniform(0, 2 * math.pi)
    smoke_particles.append({'phase': phase, 'cycle': cycle})

# 4. Bilinear mesh grid for trees swaying (left oak & right willow)
nx, ny = 32, 18
dx = base_w / nx
dy = base_h / ny

def get_mesh(t):
    mesh = []
    for j in range(ny):
        y0 = j * dy
        y1 = (j + 1) * dy
        for i in range(nx):
            x0 = i * dx
            x1 = (i + 1) * dx

            def sway(x, y):
                if 440 <= x <= 880 and y > 240:
                    return 0.0
                if y > 560:
                    return 0.0

                hf = max(0.0, min(1.0, (560 - y) / 560.0)) ** 1.5
                if x < 440:
                    tf = (440 - x) / 440.0
                    w1 = math.sin(t * 2 * math.pi / 4.0 + x * 0.003)
                    return w1 * 6.5 * hf * tf
                elif x > 860:
                    tf = (x - 860) / (base_w - 860)
                    phase_delay = y * 0.005
                    w1 = math.sin(t * 2 * math.pi / 4.0 + phase_delay)
                    w2 = 0.35 * math.sin(t * 4 * math.pi / 4.0 + phase_delay * 1.5)
                    return (w1 + w2) * 8.0 * hf * tf
                return 0.0

            s_ul = (x0 - sway(x0, y0), y0)
            s_ll = (x0 - sway(x0, y1), y1)
            s_lr = (x1 - sway(x1, y1), y1)
            s_ur = (x1 - sway(x1, y0), y0)
            mesh.append(((int(x0), int(y0), int(x1), int(y1)), 
                         (s_ul[0], s_ul[1], s_ll[0], s_ll[1], s_lr[0], s_lr[1], s_ur[0], s_ur[1])))
    return mesh

# Lamp positions: street lamp, porch lantern
lamp_positions = [(220, 345), (775, 415)]

# Warm lamp halo sprite
halo_size = 200
lamp_halo = Image.new('RGBA', (halo_size, halo_size), (0, 0, 0, 0))
d_halo = ImageDraw.Draw(lamp_halo)
hc = halo_size // 2
for r in range(hc, 0, -2):
    frac = 1.0 - (r / hc)
    a = int(65 * (frac ** 2))
    d_halo.ellipse([hc - r, hc - r, hc + r, hc + r], fill=(255, 195, 95, a))
lamp_halo = lamp_halo.filter(ImageFilter.GaussianBlur(radius=4))

raw_mp4 = '/tmp/rain_live_raw.mp4'
proc = subprocess.Popen([
    'ffmpeg', '-y', '-f', 'rawvideo', '-vcodec', 'rawvideo',
    '-s', f'{W}x{H}', '-pix_fmt', 'rgb24', '-r', str(FPS),
    '-i', '-', '-c:v', 'libx264', '-pix_fmt', 'yuv420p',
    '-preset', 'fast', '-crf', '19', raw_mp4
], stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

for f_idx in range(TOTAL_FRAMES):
    t = f_idx / FPS
    
    # 1. Mesh warp tree swaying
    mesh = get_mesh(t)
    warped = base.transform((base_w, base_h), Image.Transform.MESH, mesh, Image.Resampling.BILINEAR)

    # 2. Organic Camera Breathing Float
    cam_dx = math.sin(t * 2 * math.pi / 6.0) * 3.5
    cam_dy = math.cos(t * 2 * math.pi / 4.0) * 2.5
    crop_x = int(PAD + cam_dx)
    crop_y = int(PAD + cam_dy)
    frame = warped.crop((crop_x, crop_y, crop_x + W, crop_y + H))

    # 3. Atmospheric flickering lamp light
    flicker = 0.08 * math.sin(t * 2 * math.pi * 2.5) + 0.04 * math.sin(t * 2 * math.pi * 5.5)
    halo_alpha = max(0.5, min(1.3, 1.0 + flicker))
    
    effects_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(effects_layer)

    # Lamp halos
    for lx, ly in lamp_positions:
        cur_lx = int(lx - cam_dx)
        cur_ly = int(ly - cam_dy)
        effects_layer.paste(lamp_halo, (cur_lx - hc, cur_ly - hc), lamp_halo)

    # Chimney smoke carried by wind (x ~ 860, y ~ 160)
    for sm in smoke_particles:
        prog = ((t + sm['phase']) % sm['cycle']) / sm['cycle']
        sx = int(860 - cam_dx) + prog * 45 + math.sin(prog * math.pi * 3) * 8
        sy = int(160 - cam_dy) - prog * 85
        sr = 4 + prog * 18
        s_alpha = int(40 * math.sin(prog * math.pi))
        draw.ellipse([sx - sr, sy - sr, sx + sr, sy + sr], fill=(210, 215, 225, s_alpha))

    # Rain streaks
    for s in streaks:
        curr_y = (s['y0'] + s['vy'] * t) % (H + 60) - 30
        curr_x = (s['x0'] + curr_y * dx_factor) % W
        l = s['length']
        x2 = curr_x + l * dx_factor
        y2 = curr_y + l

        a = s['alpha']
        color = (210, 225, 240, a)
        for lx, ly in lamp_positions:
            dist = math.hypot(curr_x - (lx - cam_dx), curr_y - (ly - cam_dy))
            if dist < 120:
                frac = (1.0 - dist / 120.0)
                boosted_a = min(255, int(a * (1.0 + frac * 0.9)))
                color = (255, 230, 160, boosted_a)
                break

        draw.line([(curr_x, curr_y), (x2, y2)], fill=color, width=s['width'])

    # Puddle ripples on cobblestones
    for rip in ripples:
        tau = ((t + rip['phase']) % rip['period']) / rip['period']
        rad = tau * rip['max_r']
        alpha = int(75 * (1.0 - tau))
        rx, ry = int(rip['x'] - cam_dx), int(rip['y'] - cam_dy)
        draw.ellipse([rx - rad * 1.8, ry - rad * 0.6, rx + rad * 1.8, ry + rad * 0.6], 
                     outline=(210, 225, 240, alpha), width=1)

    frame.paste(effects_layer, (0, 0), effects_layer)
    proc.stdin.write(frame.tobytes())

proc.stdin.close()
proc.wait()

# Add 48kHz rain audio track
audio_track = '/tmp/rain_audio_48k.aac'
subprocess.run([
    'ffmpeg', '-y', '-stream_loop', '-1',
    '-i', '/home/etechsc/.gemini/antigravity/brain/01f0fcc6-1156-437b-8ae6-c46de562e6a2/scratch/audio_rain_ambient.aac',
    '-t', str(DURATION),
    '-af', f'afade=t=in:st=0:d=0.5,afade=t=out:st={DURATION - 0.5}:d=0.5',
    '-c:a', 'aac', '-ar', '48000', '-b:a', '128k', audio_track
], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

preview_out = '/tmp/preview_rainy_animated.mp4'
subprocess.run([
    'ffmpeg', '-y', '-i', raw_mp4, '-i', audio_track,
    '-c:v', 'copy', '-c:a', 'copy', '-movflags', '+faststart',
    preview_out
], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
subprocess.run(['ffmpeg', '-y', '-ss', '00:00:03', '-i', preview_out, '-vframes', '1', '/tmp/preview_rainy_animated.jpg'], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
print("Finished rendering preview_rainy_animated.mp4!")
