import os, sys, math, random, subprocess
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

W, H = 1280, 720
FPS = 25
DURATION = 12.0
TOTAL_FRAMES = int(FPS * DURATION)

SCRATCH_DIR = '/home/etechsc/.gemini/antigravity/brain/01f0fcc6-1156-437b-8ae6-c46de562e6a2/scratch'
RAIN_AUDIO = os.path.join(SCRATCH_DIR, 'audio_rain_ambient.aac')
SNOW_AUDIO = os.path.join(SCRATCH_DIR, 'audio_snow_ambient.aac')

def make_audio_loop(input_audio, output_audio, duration):
    """Loops audio seamlessly with crossfading and exports to aac"""
    cmd = [
        'ffmpeg', '-y', '-stream_loop', '-1', '-i', input_audio,
        '-t', str(duration),
        '-af', f'afade=t=in:st=0:d=0.5,afade=t=out:st={duration - 0.5}:d=0.5',
        '-c:a', 'aac', '-b:a', '128k', output_audio
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def render_snowy_animated():
    print("=== Rendering snowy-animated.mp4 ===")
    img_path = '/home/etechsc/.gemini/antigravity/brain/630aac9f-f098-4037-b5bd-56651ae7dbad/animated_winter_house_1789200090481.jpg'
    base = Image.open(img_path).convert('RGB').resize((W, H), Image.Resampling.LANCZOS)
    
    # Pre-generate snowflake particles with perfect duration loop
    random.seed(12345)
    num_flakes = 550
    flakes = []
    for _ in range(num_flakes):
        layer = random.choices([0, 1, 2], weights=[0.25, 0.45, 0.30])[0]
        if layer == 0:
            r = random.uniform(2.6, 4.2)
            vy = random.uniform(45, 65)
            alpha = random.randint(180, 240)
            drift = random.uniform(16, 26)
        elif layer == 1:
            r = random.uniform(1.6, 2.5)
            vy = random.uniform(28, 45)
            alpha = random.randint(140, 200)
            drift = random.uniform(10, 18)
        else:
            r = random.uniform(0.9, 1.5)
            vy = random.uniform(16, 28)
            alpha = random.randint(90, 160)
            drift = random.uniform(5, 12)
        
        # Perfect vertical loop: vy * DURATION must be integer multiple of (H + 40)
        cycles = max(1, round(vy * DURATION / (H + 40)))
        vy = cycles * (H + 40) / DURATION
        x0 = random.uniform(0, W)
        y0 = random.uniform(-20, H + 20)
        # Flutter frequency integer multiple of 1/DURATION for seamless loop
        flutter_cycles = random.randint(3, 8)
        freq = flutter_cycles / DURATION
        phase = random.uniform(0, 2 * math.pi)
        flakes.append({
            'x0': x0, 'y0': y0, 'r': r, 'vy': vy, 'alpha': alpha,
            'drift': drift, 'freq': freq, 'phase': phase
        })

    # Mesh deformation grid
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
                    # Height attenuation: high at top, 0 below y=560
                    hf = max(0.0, min(1.0, (560 - y) / 560.0)) ** 1.6
                    # Pine trees on left and right sides
                    if x < 480:
                        tf = (480 - x) / 480.0
                    elif x > 780:
                        tf = (x - 780) / (W - 780)
                    else:
                        tf = 0.08 # very subtle distant trees
                    
                    # 4.0s period = exactly 3 cycles in 12s
                    w1 = math.sin(t * 2 * math.pi / 4.0 + x * 0.003 + y * 0.002)
                    w2 = 0.3 * math.sin(t * 4 * math.pi / 4.0 + x * 0.005)
                    return (w1 + w2) * 6.5 * hf * tf

                s_ul = (x0 - sway(x0, y0), y0)
                s_ll = (x0 - sway(x0, y1), y1)
                s_lr = (x1 - sway(x1, y1), y1)
                s_ur = (x1 - sway(x1, y0), y0)
                mesh.append(((int(x0), int(y0), int(x1), int(y1)), 
                             (s_ul[0], s_ul[1], s_ll[0], s_ll[1], s_lr[0], s_lr[1], s_ur[0], s_ur[1])))
        return mesh

    # Prepare temp video output
    raw_video = '/tmp/snowy_animated_raw.mp4'
    audio_track = '/tmp/snowy_audio_12s.aac'
    make_audio_loop(SNOW_AUDIO, audio_track, DURATION)

    proc = subprocess.Popen([
        'ffmpeg', '-y', '-f', 'rawvideo', '-vcodec', 'rawvideo',
        '-s', f'{W}x{H}', '-pix_fmt', 'rgb24', '-r', str(FPS),
        '-i', '-', '-c:v', 'libx264', '-pix_fmt', 'yuv420p',
        '-preset', 'fast', '-crf', '20', raw_video
    ], stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    for f_idx in range(TOTAL_FRAMES):
        t = f_idx / FPS
        # 1. Mesh warp for tree swaying
        mesh = get_mesh(t)
        frame = base.transform((W, H), Image.Transform.MESH, mesh, Image.Resampling.BILINEAR)
        
        # 2. Sun breathing warmth (subtle radiant glow at top-right x=1090, y=140)
        sun_pulse = 0.04 * math.sin(t * 2 * math.pi / 4.0)
        if abs(sun_pulse) > 0.005:
            # Subtle brightness enhancement
            enhancer = ImageEnhance.Brightness(frame)
            frame = enhancer.enhance(1.0 + sun_pulse)
        
        # 3. Snowflakes overlay
        snow_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        draw = ImageDraw.Draw(snow_layer)
        for fl in flakes:
            curr_y = (fl['y0'] + fl['vy'] * t + 20) % (H + 40) - 20
            tree_wind = math.sin(t * 2 * math.pi / 4.0) * 8.0
            curr_x = (fl['x0'] + math.sin(t * 2 * math.pi * fl['freq'] + fl['phase']) * fl['drift'] + tree_wind) % W
            r = fl['r']
            a = fl['alpha']
            draw.ellipse([curr_x - r, curr_y - r, curr_x + r, curr_y + r], fill=(255, 255, 255, a))
        
        frame.paste(snow_layer, (0, 0), snow_layer)
        proc.stdin.write(frame.tobytes())

    proc.stdin.close()
    proc.wait()

    # Merge audio & optimize with faststart
    final_mp4 = 'public/videos/snowy-animated.mp4'
    poster_jpg = 'public/videos/posters/snowy-animated.jpg'
    cmd = [
        'ffmpeg', '-y', '-i', raw_video, '-i', audio_track,
        '-c:v', 'copy', '-c:a', 'copy', '-movflags', '+faststart',
        final_mp4
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    # Extract first frame poster
    subprocess.run(['ffmpeg', '-y', '-ss', '00:00:00.1', '-i', final_mp4, '-vframes', '1', '-q:v', '3', poster_jpg], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print("snowy-animated.mp4 & poster generated successfully!")

if __name__ == '__main__':
    render_snowy_animated()

def render_rainy_animated():
    print("=== Rendering rainy-night-animated.mp4 ===")
    img_path = '/home/etechsc/.gemini/antigravity/brain/630aac9f-f098-4037-b5bd-56651ae7dbad/animated_rainy_house_1789200159075.jpg'
    base = Image.open(img_path).convert('RGB').resize((W, H), Image.Resampling.LANCZOS)

    # 1. Rain streaks setup
    random.seed(54321)
    num_streaks = 850
    streaks = []
    angle_rad = math.radians(7.0) # slight wind slant
    dx_factor = math.tan(angle_rad)
    
    for _ in range(num_streaks):
        # 3 layers: foreground (closer, longer, faster), mid, background
        layer = random.choices([0, 1, 2], weights=[0.25, 0.45, 0.30])[0]
        if layer == 0:
            length = random.uniform(22, 34)
            vy = random.uniform(650, 850)
            alpha = random.randint(140, 200)
            width = 2
        elif layer == 1:
            length = random.uniform(15, 24)
            vy = random.uniform(500, 680)
            alpha = random.randint(90, 150)
            width = 1
        else:
            length = random.uniform(10, 16)
            vy = random.uniform(380, 520)
            alpha = random.randint(50, 100)
            width = 1
            
        # Ensure perfect vertical looping over DURATION
        cycles = max(2, round(vy * DURATION / (H + 60)))
        vy = cycles * (H + 60) / DURATION
        x0 = random.uniform(-60, W + 60)
        y0 = random.uniform(-30, H + 30)
        streaks.append({
            'x0': x0, 'y0': y0, 'length': length, 'vy': vy,
            'alpha': alpha, 'width': width, 'layer': layer
        })

    # 2. Puddle ripples on wet cobblestone path (y in 520..710)
    num_ripples = 35
    ripples = []
    for _ in range(num_ripples):
        rx = random.uniform(260, 1000)
        ry = random.uniform(520, 710)
        period = random.choice([1.5, 2.0, 3.0]) # divisor of 12.0
        phase = random.uniform(0, 2 * math.pi)
        max_r = random.uniform(8, 16)
        ripples.append({'x': rx, 'y': ry, 'period': period, 'phase': phase, 'max_r': max_r})

    # 3. Mesh deformation for trees swaying (left oak & right weeping willow)
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
                    # Ground & cottage cutoff (cottage x: 440..860, ground y > 530)
                    if 440 <= x <= 860 and y > 240:
                        return 0.0
                    if y > 550:
                        return 0.0
                    
                    hf = max(0.0, min(1.0, (550 - y) / 550.0)) ** 1.5
                    
                    # Left oak tree
                    if x < 440:
                        tf = (440 - x) / 440.0
                        w1 = math.sin(t * 2 * math.pi / 4.0 + x * 0.003)
                        return w1 * 6.0 * hf * tf
                    # Right weeping willow (hanging branches have pendular wave phase delay with depth y)
                    elif x > 860:
                        tf = (x - 860) / (W - 860)
                        # Weeping willow pendular motion
                        phase_delay = y * 0.005
                        w1 = math.sin(t * 2 * math.pi / 4.0 + phase_delay)
                        w2 = 0.35 * math.sin(t * 4 * math.pi / 4.0 + phase_delay * 1.5)
                        return (w1 + w2) * 7.5 * hf * tf
                    return 0.0

                s_ul = (x0 - sway(x0, y0), y0)
                s_ll = (x0 - sway(x0, y1), y1)
                s_lr = (x1 - sway(x1, y1), y1)
                s_ur = (x1 - sway(x1, y0), y0)
                mesh.append(((int(x0), int(y0), int(x1), int(y1)), 
                             (s_ul[0], s_ul[1], s_ll[0], s_ll[1], s_lr[0], s_lr[1], s_ur[0], s_ur[1])))
        return mesh

    # Pre-render radial warm lamp halo for blending
    lamp_halo_size = 180
    lamp_halo = Image.new('RGBA', (lamp_halo_size, lamp_halo_size), (0, 0, 0, 0))
    d_halo = ImageDraw.Draw(lamp_halo)
    hc = lamp_halo_size // 2
    for r in range(hc, 0, -2):
        frac = 1.0 - (r / hc)
        a = int(60 * (frac ** 2))
        d_halo.ellipse([hc - r, hc - r, hc + r, hc + r], fill=(255, 190, 90, a))
    lamp_halo = lamp_halo.filter(ImageFilter.GaussianBlur(radius=3))

    raw_video = '/tmp/rainy_animated_raw.mp4'
    audio_track = '/tmp/rainy_audio_12s.aac'
    make_audio_loop(RAIN_AUDIO, audio_track, DURATION)

    proc = subprocess.Popen([
        'ffmpeg', '-y', '-f', 'rawvideo', '-vcodec', 'rawvideo',
        '-s', f'{W}x{H}', '-pix_fmt', 'rgb24', '-r', str(FPS),
        '-i', '-', '-c:v', 'libx264', '-pix_fmt', 'yuv420p',
        '-preset', 'fast', '-crf', '20', raw_video
    ], stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    lamp_pos = [(220, 345), (775, 415)] # street lamp, porch lantern

    for f_idx in range(TOTAL_FRAMES):
        t = f_idx / FPS
        # 1. Tree swaying mesh warp
        mesh = get_mesh(t)
        frame = base.transform((W, H), Image.Transform.MESH, mesh, Image.Resampling.BILINEAR)

        # 2. Lamp light warm breathing & flicker
        flicker = 0.08 * math.sin(t * 2 * math.pi * 2.0) + 0.04 * math.sin(t * 2 * math.pi * 5.0)
        halo_alpha = max(0.4, min(1.3, 1.0 + flicker))
        
        # Composite lamp halo
        halo_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        for lx, ly in lamp_pos:
            halo_layer.paste(lamp_halo, (lx - hc, ly - hc), lamp_halo)
        
        # 3. Rain streaks layer
        rain_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        draw_rain = ImageDraw.Draw(rain_layer)

        for s in streaks:
            curr_y = (s['y0'] + s['vy'] * t) % (H + 60) - 30
            curr_x = (s['x0'] + curr_y * dx_factor) % W
            l = s['length']
            x2 = curr_x + l * dx_factor
            y2 = curr_y + l
            
            # If rain is near lamp light, make it glow warm amber
            a = s['alpha']
            color = (210, 225, 240, a)
            for lx, ly in lamp_pos:
                dist = math.hypot(curr_x - lx, curr_y - ly)
                if dist < 120:
                    glow_boost = (1.0 - dist / 120.0)
                    a_boost = min(255, int(a * (1.0 + glow_boost * 0.8)))
                    color = (255, 230, 160, a_boost)
                    break
            
            draw_rain.line([(curr_x, curr_y), (x2, y2)], fill=color, width=s['width'])

        # 4. Puddle ripples
        for rip in ripples:
            # Cycle in [0, 1)
            tau = ((t + rip['phase']) % rip['period']) / rip['period']
            rad = tau * rip['max_r']
            alpha = int(70 * (1.0 - tau))
            rx, ry = rip['x'], rip['y']
            draw_rain.ellipse([rx - rad * 1.8, ry - rad * 0.6, rx + rad * 1.8, ry + rad * 0.6], 
                              outline=(210, 225, 240, alpha), width=1)

        # Composite everything
        frame.paste(halo_layer, (0, 0), halo_layer)
        frame.paste(rain_layer, (0, 0), rain_layer)
        proc.stdin.write(frame.tobytes())

    proc.stdin.close()
    proc.wait()

    # Merge audio & optimize
    final_mp4 = 'public/videos/rainy-night-animated.mp4'
    poster_jpg = 'public/videos/posters/rainy-night-animated.jpg'
    cmd = [
        'ffmpeg', '-y', '-i', raw_video, '-i', audio_track,
        '-c:v', 'copy', '-c:a', 'copy', '-movflags', '+faststart',
        final_mp4
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    subprocess.run(['ffmpeg', '-y', '-ss', '00:00:00.1', '-i', final_mp4, '-vframes', '1', '-q:v', '3', poster_jpg], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print("rainy-night-animated.mp4 & poster generated successfully!")

if __name__ == '__main__':
    render_rainy_animated()

def render_rainy_realistic():
    print("=== Rendering realistic rainy-night.mp4 ===")
    img_path = '/home/etechsc/.gemini/antigravity/brain/630aac9f-f098-4037-b5bd-56651ae7dbad/rainy_city_avenue_1789200852523.jpg'
    base = Image.open(img_path).convert('RGB').resize((W, H), Image.Resampling.LANCZOS)

    # 1. Realistic rain streaks
    # Real night rain is fine, hair-thin, and varying in opacity
    random.seed(98765)
    num_streaks = 1200
    streaks = []
    angle_rad = math.radians(6.0) # realistic downward slant with wind
    dx_factor = math.tan(angle_rad)

    # Main light sources where rain catches light
    lights = [
        (50, 420, 100, (255, 210, 130)),   # Pub lantern
        (140, 110, 90, (255, 220, 150)),   # Pub sign
        (205, 240, 120, (255, 140, 140)),  # Red restaurant neon
        (420, 220, 130, (255, 235, 180)),  # Street lamp 1
        (700, 350, 110, (255, 225, 170)),  # Street lamp 2
        (835, 215, 140, (255, 235, 180)),  # Street lamp 3
        (530, 650, 90, (255, 120, 120)),   # Car red taillight reflection
        (740, 620, 100, (255, 240, 200)),  # Red bus lights
        (830, 660, 90, (255, 240, 200))    # Taxi lights
    ]

    for _ in range(num_streaks):
        # 3 depth tiers: fine background mist rain, mid ground, crisp foreground streaks
        tier = random.choices([0, 1, 2], weights=[0.20, 0.50, 0.30])[0]
        if tier == 0:
            length = random.uniform(24, 38)
            vy = random.uniform(850, 1150)
            base_alpha = random.randint(110, 170)
            width = 1
        elif tier == 1:
            length = random.uniform(16, 26)
            vy = random.uniform(650, 850)
            base_alpha = random.randint(70, 120)
            width = 1
        else:
            length = random.uniform(10, 18)
            vy = random.uniform(500, 650)
            base_alpha = random.randint(35, 75)
            width = 1

        cycles = max(2, round(vy * DURATION / (H + 60)))
        vy = cycles * (H + 60) / DURATION
        x0 = random.uniform(-60, W + 60)
        y0 = random.uniform(-40, H + 40)
        streaks.append({
            'x0': x0, 'y0': y0, 'length': length, 'vy': vy,
            'base_alpha': base_alpha, 'width': width
        })

    # 2. Wet asphalt specular glints (subtle micro-ripples/shimmers on road y: 480..720)
    num_glints = 45
    glints = []
    for _ in range(num_glints):
        gx = random.uniform(100, W - 50)
        gy = random.uniform(480, H - 10)
        period = random.choice([1.0, 1.5, 2.0, 3.0])
        phase = random.uniform(0, 2 * math.pi)
        glints.append({'x': gx, 'y': gy, 'period': period, 'phase': phase})

    raw_video = '/tmp/rainy_city_raw.mp4'
    audio_track = '/tmp/rainy_city_audio_12s.aac'
    make_audio_loop(RAIN_AUDIO, audio_track, DURATION)

    proc = subprocess.Popen([
        'ffmpeg', '-y', '-f', 'rawvideo', '-vcodec', 'rawvideo',
        '-s', f'{W}x{H}', '-pix_fmt', 'rgb24', '-r', str(FPS),
        '-i', '-', '-c:v', 'libx264', '-pix_fmt', 'yuv420p',
        '-preset', 'fast', '-crf', '19', raw_video
    ], stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    for f_idx in range(TOTAL_FRAMES):
        t = f_idx / FPS
        frame = base.copy()

        # 1. Subtle atmospheric rain shimmer on city lights (1-2% luminance breathing)
        flicker = 0.025 * math.sin(t * 2 * math.pi * 3.0) + 0.015 * math.sin(t * 2 * math.pi * 7.0)
        if abs(flicker) > 0.005:
            enhancer = ImageEnhance.Brightness(frame)
            frame = enhancer.enhance(1.0 + flicker)

        # 2. Rain streaks layer with physical light interaction
        rain_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
        draw_rain = ImageDraw.Draw(rain_layer)

        for s in streaks:
            curr_y = (s['y0'] + s['vy'] * t) % (H + 60) - 30
            curr_x = (s['x0'] + curr_y * dx_factor) % W
            l = s['length']
            x2 = curr_x + l * dx_factor
            y2 = curr_y + l

            # Check illumination from nearby lights
            alpha = s['base_alpha']
            color = (215, 230, 245, alpha)

            for lx, ly, lrad, lcolor in lights:
                dist = math.hypot(curr_x - lx, curr_y - ly)
                if dist < lrad:
                    frac = 1.0 - (dist / lrad)
                    # Boost opacity and tint with light color
                    boosted_a = min(255, int(alpha * (1.0 + frac * 1.2)))
                    r = int(215 * (1 - frac) + lcolor[0] * frac)
                    g = int(230 * (1 - frac) + lcolor[1] * frac)
                    b = int(245 * (1 - frac) + lcolor[2] * frac)
                    color = (r, g, b, boosted_a)
                    break

            draw_rain.line([(curr_x, curr_y), (x2, y2)], fill=color, width=s['width'])

        # 3. Wet asphalt specular water shimmer
        for gl in glints:
            tau = ((t + gl['phase']) % gl['period']) / gl['period']
            if tau < 0.4:
                # brief specular flash as raindrop hits reflective water puddle
                f_flash = math.sin(tau / 0.4 * math.pi)
                a_glint = int(80 * f_flash)
                gx, gy = gl['x'], gl['y']
                draw_rain.ellipse([gx - 3, gy - 1, gx + 3, gy + 1], fill=(240, 245, 255, a_glint))

        frame.paste(rain_layer, (0, 0), rain_layer)
        proc.stdin.write(frame.tobytes())

    proc.stdin.close()
    proc.wait()

    # Merge audio & optimize
    final_mp4 = 'public/videos/rainy-night.mp4'
    poster_jpg = 'public/videos/posters/rainy-night.jpg'
    cmd = [
        'ffmpeg', '-y', '-i', raw_video, '-i', audio_track,
        '-c:v', 'copy', '-c:a', 'copy', '-movflags', '+faststart',
        final_mp4
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    subprocess.run(['ffmpeg', '-y', '-ss', '00:00:00.1', '-i', final_mp4, '-vframes', '1', '-q:v', '3', poster_jpg], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print("realistic rainy-night.mp4 & poster generated successfully!")

if __name__ == '__main__':
    render_rainy_realistic()
