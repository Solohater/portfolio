import os, sys, math, random, subprocess
from PIL import Image, ImageDraw, ImageFilter

W, H = 1280, 720
FPS = 25
DURATION = 12.0
TOTAL_FRAMES = int(FPS * DURATION)

SOURCE_IMG = '/home/etechsc/.gemini/antigravity/brain/08952c1c-3b33-4237-942a-f385ac627bd0/disney_day_market_1789283810771.jpg'
SNOW_AUDIO = '/home/etechsc/.gemini/antigravity/brain/01f0fcc6-1156-437b-8ae6-c46de562e6a2/scratch/audio_snow_ambient.aac'

def prepare_base_image():
    im = Image.open(SOURCE_IMG).convert('RGB')
    w, h = im.size
    target_aspect = 16.0 / 9.0
    curr_aspect = w / h
    if curr_aspect > target_aspect:
        new_w = int(h * target_aspect)
        left = (w - new_w) // 2
        im_cropped = im.crop((left, 0, left + new_w, h))
    else:
        new_h = int(w / target_aspect)
        top = (h - new_h) // 2
        im_cropped = im.crop((0, top, w, top + new_h))
    
    # Resize to exact 1280x720
    base = im_cropped.resize((W, H), Image.Resampling.LANCZOS)
    return base

def make_audio_loop(input_audio, output_audio, duration):
    """Loops audio seamlessly with crossfading and exports to aac"""
    cmd = [
        'ffmpeg', '-y', '-stream_loop', '-1', '-i', input_audio,
        '-t', str(duration),
        '-af', f'afade=t=in:st=0:d=0.4,afade=t=out:st={duration - 0.4}:d=0.4',
        '-c:a', 'aac', '-b:a', '128k', output_audio
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def setup_snowflakes():
    random.seed(2026)
    flakes = []
    # 3 depth layers: foreground (bokeh), midground (crisp drift), background (fine flurry)
    # Layer 0: Foreground bokeh
    for _ in range(90):
        r = random.uniform(3.2, 5.2)
        vy_target = random.uniform(50, 75)
        cycles = max(1, round(vy_target * DURATION / (H + 40)))
        vy = cycles * (H + 40) / DURATION
        flakes.append({
            'x0': random.uniform(0, W),
            'y0': random.uniform(-20, H + 20),
            'r': r,
            'vy': vy,
            'alpha': random.randint(150, 210),
            'drift': random.uniform(18, 30),
            'freq': random.randint(2, 5) / DURATION,
            'phase': random.uniform(0, 2 * math.pi),
            'layer': 0
        })
    # Layer 1: Midground
    for _ in range(320):
        r = random.uniform(1.6, 2.7)
        vy_target = random.uniform(30, 48)
        cycles = max(1, round(vy_target * DURATION / (H + 40)))
        vy = cycles * (H + 40) / DURATION
        flakes.append({
            'x0': random.uniform(0, W),
            'y0': random.uniform(-20, H + 20),
            'r': r,
            'vy': vy,
            'alpha': random.randint(130, 190),
            'drift': random.uniform(10, 18),
            'freq': random.randint(3, 7) / DURATION,
            'phase': random.uniform(0, 2 * math.pi),
            'layer': 1
        })
    # Layer 2: Background flurry
    for _ in range(240):
        r = random.uniform(0.9, 1.5)
        vy_target = random.uniform(16, 28)
        cycles = max(1, round(vy_target * DURATION / (H + 40)))
        vy = cycles * (H + 40) / DURATION
        flakes.append({
            'x0': random.uniform(0, W),
            'y0': random.uniform(-20, H + 20),
            'r': r,
            'vy': vy,
            'alpha': random.randint(80, 140),
            'drift': random.uniform(5, 12),
            'freq': random.randint(2, 6) / DURATION,
            'phase': random.uniform(0, 2 * math.pi),
            'layer': 2
        })
    return flakes

def setup_steam_emitters():
    # Hot Cider stall (x=140, y=440), Bakery stall (x=330, y=450), Right stall (x=930, y=440)
    emitters = [
        {'x': 142, 'y': 440, 'count': 16, 'max_drift': 12, 'rise_h': 65, 'max_r': 18},
        {'x': 328, 'y': 460, 'count': 12, 'max_drift': 10, 'rise_h': 50, 'max_r': 14},
        {'x': 930, 'y': 445, 'count': 14, 'max_drift': 12, 'rise_h': 55, 'max_r': 16},
    ]
    random.seed(999)
    particles = []
    for em in emitters:
        period = 3.0 # exactly 4 cycles in 12s
        for i in range(em['count']):
            delay = (i / em['count']) * period
            particles.append({
                'base_x': em['x'],
                'base_y': em['y'],
                'period': period,
                'delay': delay,
                'max_drift': em['max_drift'],
                'rise_h': em['rise_h'],
                'max_r': em['max_r'],
                'wobble_freq': random.choice([1, 2]),
                'wobble_phase': random.uniform(0, 2 * math.pi)
            })
    return particles

def setup_fairy_lights():
    # Key light positions on roof eaves and garlands
    lights = []
    random.seed(777)
    # Left stall triangular roof: (25, 340) -> (150, 160) -> (255, 330)
    for t in [0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1.0]:
        # Up slope
        x = 25 + t * (150 - 25)
        y = 340 + t * (160 - 340)
        color = random.choice([(255, 230, 150), (255, 100, 100), (120, 255, 140), (255, 200, 80)])
        lights.append({'x': x, 'y': y, 'color': color, 'r': random.uniform(3.5, 5.5), 'freq': random.randint(1, 4), 'phase': random.uniform(0, 2*math.pi)})
    for t in [0.15, 0.3, 0.45, 0.6, 0.75, 0.9]:
        # Down slope
        x = 150 + t * (255 - 150)
        y = 160 + t * (330 - 160)
        color = random.choice([(255, 230, 150), (255, 100, 100), (120, 255, 140), (255, 200, 80)])
        lights.append({'x': x, 'y': y, 'color': color, 'r': random.uniform(3.5, 5.5), 'freq': random.randint(1, 4), 'phase': random.uniform(0, 2*math.pi)})
    # Hot Cider stall counter garland
    for x in range(35, 150, 18):
        y = 495 + math.sin((x - 35) / 115.0 * math.pi) * 8
        color = random.choice([(255, 220, 130), (255, 180, 70), (255, 90, 90)])
        lights.append({'x': x, 'y': y, 'color': color, 'r': 3.5, 'freq': random.randint(2, 5), 'phase': random.uniform(0, 2*math.pi)})
    # Right lantern: (1215, 395)
    lights.append({'x': 1215, 'y': 395, 'color': (255, 200, 100), 'r': 12.0, 'freq': 1, 'phase': 0})
    # Right stall garland ornaments / lights
    for x in range(940, 1260, 32):
        y = 320 + math.sin((x - 940) / 320.0 * math.pi * 3) * 6
        color = random.choice([(255, 235, 160), (255, 110, 110), (100, 255, 160), (255, 210, 90)])
        lights.append({'x': x, 'y': y, 'color': color, 'r': random.uniform(3.5, 5.0), 'freq': random.randint(1, 4), 'phase': random.uniform(0, 2*math.pi)})
    return lights

def setup_mesh_warp():
    # Subtle organic awning breathing/swaying
    nx, ny = 32, 18
    dx = W / nx
    dy = H / ny
    
    def get_mesh(t):
        mesh = []
        for j in range(ny):
            y0 = j * dy
            y1 = (j + 1) * dy
            for i in range(nx):
                x0 = i * dx
                x1 = (i + 1) * dx
                
                def sway(x, y):
                    # Subtle sway mainly on fabric awnings and hanging garlands
                    # Left stall awning: x in [220, 390], y in [280, 420]
                    # Right stall awning: x in [940, 1280], y in [200, 380]
                    sw = 0.0
                    if 220 <= x <= 390 and 280 <= y <= 420:
                        factor = math.sin((x - 220) / 170.0 * math.pi) * ((y - 280) / 140.0)
                        sw += math.sin(t * 2 * math.pi / 4.0 + x * 0.01) * 3.0 * factor
                    elif 940 <= x <= 1280 and 200 <= y <= 380:
                        factor = math.sin((x - 940) / 340.0 * math.pi) * ((y - 200) / 180.0)
                        sw += math.sin(t * 2 * math.pi / 4.0 + x * 0.01) * 3.5 * factor
                    return sw
                
                s_ul = (x0 - sway(x0, y0), y0)
                s_ll = (x0 - sway(x0, y1), y1)
                s_lr = (x1 - sway(x1, y1), y1)
                s_ur = (x1 - sway(x1, y0), y0)
                mesh.append(((int(x0), int(y0), int(x1), int(y1)), 
                             (s_ul[0], s_ul[1], s_ll[0], s_ll[1], s_lr[0], s_lr[1], s_ur[0], s_ur[1])))
        return mesh
    return get_mesh

def render_disney_market():
    print("=== Rendering Disney Day Market Animated Background ===")
    base = prepare_base_image()
    flakes = setup_snowflakes()
    steam_particles = setup_steam_emitters()
    fairy_lights = setup_fairy_lights()
    get_mesh = setup_mesh_warp()
    
    # Pre-render golden sunbeam glow mask
    sun_mask = Image.new('L', (W, H), 0)
    sdraw = ImageDraw.Draw(sun_mask)
    # Sun center at x=320, y=80
    for r in range(450, 0, -25):
        alpha = int((1.0 - (r / 450.0) ** 1.5) * 45)
        sdraw.ellipse([320 - r, 80 - r * 0.7, 320 + r, 80 + r * 0.7], fill=alpha)
    sun_mask = sun_mask.filter(ImageFilter.GaussianBlur(35))
    sun_glow_layer = Image.new('RGB', (W, H), (255, 235, 180)) # Warm golden tone

    raw_video = '/tmp/disney_market_raw.mp4'
    audio_track = '/tmp/disney_market_audio.aac'
    output_mp4 = 'public/videos/snowy-animated.mp4'
    poster_jpg = 'public/videos/posters/snowy-animated.jpg'

    print("Generating audio loop...")
    make_audio_loop(SNOW_AUDIO, audio_track, DURATION)

    print("Spawning ffmpeg rawvideo encoding...")
    proc = subprocess.Popen([
        'ffmpeg', '-y', '-f', 'rawvideo', '-vcodec', 'rawvideo',
        '-s', f'{W}x{H}', '-pix_fmt', 'rgb24', '-r', str(FPS),
        '-i', '-', '-c:v', 'libx264', '-pix_fmt', 'yuv420p',
        '-preset', 'medium', '-crf', '18', raw_video
    ], stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    for f_idx in range(TOTAL_FRAMES):
        t = f_idx / FPS
        
        # 1. Mesh warp for gentle awning flutter
        mesh = get_mesh(t)
        frame = base.transform((W, H), Image.Transform.MESH, mesh, Image.Resampling.BILINEAR)

        # 2. Warm Golden Sunbeam Breathing
        # 3 cycles in 12s (4.0s period)
        sun_pulse = (math.sin(t * 2 * math.pi / 4.0) + 1.0) * 0.5 # 0.0 to 1.0
        if sun_pulse > 0.01:
            pulse_mask = sun_mask.point(lambda p: int(p * sun_pulse * 0.65))
            frame = Image.composite(sun_glow_layer, frame, pulse_mask)

        # 3. Steaming Stalls
        steam_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        steam_draw = ImageDraw.Draw(steam_layer)
        for sp in steam_particles:
            age = (t + sp['delay']) % sp['period']
            progress = age / sp['period'] # 0.0 to 1.0
            
            # Rising y
            py = sp['base_y'] - progress * sp['rise_h']
            # Drift and wobble x
            wobble = math.sin(progress * 2 * math.pi * sp['wobble_freq'] + sp['wobble_phase'])
            px = sp['base_x'] + progress * sp['max_drift'] + wobble * 4.0
            
            # Size grows with age
            pr = 2.0 + progress * sp['max_r']
            
            # Fade in then fade out smoothly
            alpha_curve = math.sin(progress * math.pi) ** 1.8
            p_alpha = int(alpha_curve * 65)
            
            steam_draw.ellipse([px - pr, py - pr, px + pr, py + pr], fill=(245, 245, 255, p_alpha))
        
        steam_layer = steam_layer.filter(ImageFilter.GaussianBlur(4))
        frame.paste(steam_layer, (0, 0), steam_layer)

        # 4. Twinkling Fairy Lights & Lanterns
        light_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        ldraw = ImageDraw.Draw(light_layer)
        for fl in fairy_lights:
            # Twinkle formula
            twinkle = (math.sin(t * 2 * math.pi * fl['freq'] / DURATION + fl['phase']) + 1.0) * 0.5
            lr = fl['r'] * (0.85 + 0.3 * twinkle)
            lalpha = int((0.4 + 0.6 * twinkle) * 180)
            c = fl['color']
            # Inner bright core
            ldraw.ellipse([fl['x'] - lr*0.6, fl['y'] - lr*0.6, fl['x'] + lr*0.6, fl['y'] + lr*0.6], 
                          fill=(255, 255, 255, min(255, int(lalpha * 1.3))))
            # Outer warm glow
            ldraw.ellipse([fl['x'] - lr*1.6, fl['y'] - lr*1.6, fl['x'] + lr*1.6, fl['y'] + lr*1.6], 
                          fill=(c[0], c[1], c[2], int(lalpha * 0.55)))

        light_layer = light_layer.filter(ImageFilter.GaussianBlur(2))
        frame.paste(light_layer, (0, 0), light_layer)

        # 5. Falling Snowflakes (3 depth layers)
        # Background flakes
        snow_bg = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        bdraw = ImageDraw.Draw(snow_bg)
        # Midground flakes
        snow_mid = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        mdraw = ImageDraw.Draw(snow_mid)
        # Foreground bokeh flakes
        snow_fg = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        fdraw = ImageDraw.Draw(snow_fg)

        wind = math.sin(t * 2 * math.pi / 6.0) * 10.0 # gentle gust cycle

        for fl in flakes:
            curr_y = (fl['y0'] + fl['vy'] * t + 20) % (H + 40) - 20
            flutter = math.sin(t * 2 * math.pi * fl['freq'] + fl['phase']) * fl['drift']
            curr_x = (fl['x0'] + flutter + wind) % W
            r = fl['r']
            a = fl['alpha']
            
            if fl['layer'] == 2:
                bdraw.ellipse([curr_x - r, curr_y - r, curr_x + r, curr_y + r], fill=(255, 255, 255, a))
            elif fl['layer'] == 1:
                mdraw.ellipse([curr_x - r, curr_y - r, curr_x + r, curr_y + r], fill=(255, 255, 255, a))
            else: # Layer 0: Foreground bokeh
                fdraw.ellipse([curr_x - r, curr_y - r, curr_x + r, curr_y + r], fill=(255, 255, 255, a))

        # Soft bokeh blur on foreground flakes
        snow_fg = snow_fg.filter(ImageFilter.GaussianBlur(2.0))
        # Composite layers
        frame.paste(snow_bg, (0, 0), snow_bg)
        frame.paste(snow_mid, (0, 0), snow_mid)
        frame.paste(snow_fg, (0, 0), snow_fg)

        proc.stdin.write(frame.tobytes())

        if f_idx % 50 == 0:
            print(f"Rendered {f_idx}/{TOTAL_FRAMES} frames ({int(f_idx/TOTAL_FRAMES*100)}%)")

    proc.stdin.close()
    proc.wait()
    print("Video stream finished. Merging audio and finalizing mp4...")

    # Finalize with audio and faststart
    cmd = [
        'ffmpeg', '-y', '-i', raw_video, '-i', audio_track,
        '-c:v', 'copy', '-c:a', 'copy', '-movflags', '+faststart',
        output_mp4
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # Extract first frame poster
    subprocess.run(['ffmpeg', '-y', '-ss', '00:00:00.1', '-i', output_mp4, '-vframes', '1', '-q:v', '2', poster_jpg], 
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f"SUCCESS: Created {output_mp4} and {poster_jpg}")

if __name__ == '__main__':
    render_disney_market()
