import math, random, subprocess
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

W, H = 1280, 720
FPS = 25
DURATION = 12.0
TOTAL_FRAMES = int(FPS * DURATION)

img_path = '/home/etechsc/.gemini/antigravity/brain/630aac9f-f098-4037-b5bd-56651ae7dbad/animated_winter_house_1789200090481.jpg'
base_img = Image.open(img_path).convert('RGB')
# Pad image slightly so smooth camera breathing drift has margin without black borders
PAD = 24
base_w, base_h = W + PAD * 2, H + PAD * 2
base = base_img.resize((base_w, base_h), Image.Resampling.LANCZOS)

# 1. Multi-depth Snowflakes with Optical Bokeh
random.seed(42)
num_flakes = 600
flakes = []
for _ in range(num_flakes):
    layer = random.choices([0, 1, 2], weights=[0.20, 0.45, 0.35])[0]
    if layer == 0: # Foreground (close to lens, soft bokeh blur)
        r = random.uniform(3.5, 6.0)
        vy = random.uniform(50, 75)
        alpha = random.randint(160, 220)
        drift = random.uniform(18, 30)
    elif layer == 1: # Midground (crisp flakes with directional flutter)
        r = random.uniform(1.8, 2.8)
        vy = random.uniform(30, 48)
        alpha = random.randint(140, 210)
        drift = random.uniform(10, 20)
    else: # Background (fine snow flurry)
        r = random.uniform(0.9, 1.6)
        vy = random.uniform(18, 32)
        alpha = random.randint(80, 150)
        drift = random.uniform(6, 12)
        
    cycles = max(1, round(vy * DURATION / (H + 60)))
    vy = cycles * (H + 60) / DURATION
    x0 = random.uniform(-40, W + 40)
    y0 = random.uniform(-30, H + 30)
    freq = random.randint(2, 6) / DURATION
    phase = random.uniform(0, 2 * math.pi)
    flakes.append({
        'x0': x0, 'y0': y0, 'r': r, 'vy': vy, 'alpha': alpha,
        'drift': drift, 'freq': freq, 'phase': phase, 'layer': layer
    })

# 2. Chimney Smoke Particles
# Chimney top in base image ~ x: 575, y: 220
num_smoke = 28
smoke_particles = []
for _ in range(num_smoke):
    cycle_time = random.uniform(2.5, 4.0)
    phase = random.uniform(0, 2 * math.pi)
    smoke_particles.append({'phase': phase, 'cycle': cycle_time})

# 3. Bilinear Mesh Grid for Organic Tree Swaying
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
                # House center ~ 500..820, y > 240
                if 520 <= x <= 820 and y > 240:
                    return 0.0
                if y > 580:
                    return 0.0
                
                hf = max(0.0, min(1.0, (580 - y) / 580.0)) ** 1.5
                if x < 520:
                    tf = (520 - x) / 520.0
                    w1 = math.sin(t * 2 * math.pi / 4.0 + x * 0.003 + y * 0.002)
                    w2 = 0.3 * math.sin(t * 4 * math.pi / 4.0 + x * 0.005)
                    return (w1 + w2) * 7.0 * hf * tf
                elif x > 800:
                    tf = (x - 800) / (base_w - 800)
                    w1 = math.sin(t * 2 * math.pi / 4.0 + x * 0.003 - y * 0.002)
                    w2 = 0.3 * math.sin(t * 4 * math.pi / 4.0 - x * 0.005)
                    return (w1 + w2) * 7.0 * hf * tf
                return 0.0

            s_ul = (x0 - sway(x0, y0), y0)
            s_ll = (x0 - sway(x0, y1), y1)
            s_lr = (x1 - sway(x1, y1), y1)
            s_ur = (x1 - sway(x1, y0), y0)
            mesh.append(((int(x0), int(y0), int(x1), int(y1)), 
                         (s_ul[0], s_ul[1], s_ll[0], s_ll[1], s_lr[0], s_lr[1], s_ur[0], s_ur[1])))
    return mesh

raw_mp4 = '/tmp/snow_live_raw.mp4'
proc = subprocess.Popen([
    'ffmpeg', '-y', '-f', 'rawvideo', '-vcodec', 'rawvideo',
    '-s', f'{W}x{H}', '-pix_fmt', 'rgb24', '-r', str(FPS),
    '-i', '-', '-c:v', 'libx264', '-pix_fmt', 'yuv420p',
    '-preset', 'fast', '-crf', '19', raw_mp4
], stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

for f_idx in range(TOTAL_FRAMES):
    t = f_idx / FPS
    
    # 1. Mesh warp tree swaying on padded base
    mesh = get_mesh(t)
    warped = base.transform((base_w, base_h), Image.Transform.MESH, mesh, Image.Resampling.BILINEAR)
    
    # 2. Organic Camera Breathing Float (subtle 3-5 pixel smooth drift)
    cam_dx = math.sin(t * 2 * math.pi / 6.0) * 4.0
    cam_dy = math.cos(t * 2 * math.pi / 4.0) * 3.0
    crop_x = int(PAD + cam_dx)
    crop_y = int(PAD + cam_dy)
    frame = warped.crop((crop_x, crop_y, crop_x + W, crop_y + H))
    
    # 3. Radiant Sunlight Pulse (subtle warm breathing on sun rays)
    sun_shimmer = 0.03 * math.sin(t * 2 * math.pi / 4.0) + 0.015 * math.sin(t * 2 * math.pi * 1.5)
    if abs(sun_shimmer) > 0.005:
        enhancer = ImageEnhance.Brightness(frame)
        frame = enhancer.enhance(1.0 + sun_shimmer)

    # 4. Dynamic Atmospheric Elements Layer (Snowflakes + Chimney Smoke)
    effects_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(effects_layer)
    
    # Chimney smoke billowing (x ~ 575, y ~ 220)
    for sm in smoke_particles:
        progress = ((t + sm['phase']) % sm['cycle']) / sm['cycle']
        sx = 575 + progress * 25 + math.sin(progress * math.pi * 3) * 6
        sy = 220 - progress * 95
        sr = 4 + progress * 16
        s_alpha = int(45 * math.sin(progress * math.pi))
        draw.ellipse([sx - sr, sy - sr, sx + sr, sy + sr], fill=(240, 245, 250, s_alpha))

    # Snowflakes with layer-specific optical physics
    for fl in flakes:
        curr_y = (fl['y0'] + fl['vy'] * t + 30) % (H + 60) - 30
        tree_wind = math.sin(t * 2 * math.pi / 4.0) * 8.0
        curr_x = (fl['x0'] + math.sin(t * 2 * math.pi * fl['freq'] + fl['phase']) * fl['drift'] + tree_wind) % W
        r = fl['r']
        a = fl['alpha']
        
        # Draw soft flake
        if fl['layer'] == 0:
            # Soft bokeh circle
            draw.ellipse([curr_x - r, curr_y - r, curr_x + r, curr_y + r], fill=(255, 255, 255, int(a * 0.6)))
            draw.ellipse([curr_x - r*0.6, curr_y - r*0.6, curr_x + r*0.6, curr_y + r*0.6], fill=(255, 255, 255, a))
        else:
            draw.ellipse([curr_x - r, curr_y - r, curr_x + r, curr_y + r], fill=(255, 255, 255, a))

    frame.paste(effects_layer, (0, 0), effects_layer)
    proc.stdin.write(frame.tobytes())

proc.stdin.close()
proc.wait()

# Add 48kHz audio track
audio_track = '/tmp/snow_audio_48k.aac'
subprocess.run([
    'ffmpeg', '-y', '-stream_loop', '-1',
    '-i', '/home/etechsc/.gemini/antigravity/brain/01f0fcc6-1156-437b-8ae6-c46de562e6a2/scratch/audio_snow_ambient.aac',
    '-t', str(DURATION),
    '-af', f'afade=t=in:st=0:d=0.5,afade=t=out:st={DURATION - 0.5}:d=0.5',
    '-c:a', 'aac', '-ar', '48000', '-b:a', '128k', audio_track
], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

preview_out = '/tmp/preview_snowy_animated.mp4'
subprocess.run([
    'ffmpeg', '-y', '-i', raw_mp4, '-i', audio_track,
    '-c:v', 'copy', '-c:a', 'copy', '-movflags', '+faststart',
    preview_out
], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
subprocess.run(['ffmpeg', '-y', '-ss', '00:00:03', '-i', preview_out, '-vframes', '1', '/tmp/preview_snowy_animated.jpg'], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
print("Finished rendering preview_snowy_animated.mp4!")
