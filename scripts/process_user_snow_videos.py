import os, subprocess

LIGHT_SRC = '/home/etechsc/Downloads/Telegram Desktop/snow.mp4'
DARK_SRC = '/home/etechsc/Downloads/Telegram Desktop/snow1.mp4'

SFX_DIR = '/home/etechsc/.gemini/antigravity/brain/08952c1c-3b33-4237-942a-f385ac627bd0/scratch/sfx'
SNOW_AMB = '/home/etechsc/.gemini/antigravity/brain/01f0fcc6-1156-437b-8ae6-c46de562e6a2/scratch/audio_snow_ambient.aac'

LIGHT_OUT_VIDEO = 'public/videos/snowy-animated.mp4'
LIGHT_OUT_POSTER = 'public/videos/posters/snowy-animated.jpg'

DARK_OUT_VIDEO = 'public/videos/rainy-night-animated.mp4'
DARK_OUT_POSTER = 'public/videos/posters/rainy-night-animated.jpg'

def process_light():
    print("=== Processing Light Mode: snow.mp4 ===")
    tmp_vid = '/tmp/light_loop_seamless.mp4'
    tmp_aud = '/tmp/light_audio_mastered.aac'

    # 1. Seamless video loop: 10.0s -> crossfade 1.0s -> 9.0s perfect loop
    cmd_vid = [
        'ffmpeg', '-y', '-i', LIGHT_SRC,
        '-filter_complex',
        '[0:v]split=2[v0][v1];'
        '[v0]trim=start=1.0:end=10.0,setpts=PTS-STARTPTS[main];'
        '[v1]trim=start=0.0:end=1.0,setpts=PTS-STARTPTS[tail];'
        '[main][tail]xfade=transition=fade:duration=1.0:offset=8.0,format=yuv420p[v_out]',
        '-map', '[v_out]',
        '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p',
        tmp_vid
    ]
    subprocess.run(cmd_vid, check=True)

    # 2. Christmas bells + snowy sound audio (no human speech)
    cmd_aud = [
        'ffmpeg', '-y',
        '-stream_loop', '-1', '-i', SNOW_AMB,
        '-stream_loop', '-1', '-i', f'{SFX_DIR}/sfx_945.mp3',
        '-i', f'{SFX_DIR}/sfx_939.mp3',
        '-filter_complex',
        '[0:a]volume=0.55,atrim=0:9.0,asetpts=PTS-STARTPTS[a_snow];'
        '[1:a]volume=0.22,atrim=0:9.0,asetpts=PTS-STARTPTS[a_sleigh];'
        '[2:a]adelay=1000|1000,volume=0.32,atrim=0:9.0,asetpts=PTS-STARTPTS[a_bell];'
        '[a_snow][a_sleigh][a_bell]amix=inputs=3:duration=first[a_mix];'
        '[a_mix]afade=t=in:st=0:d=0.45,afade=t=out:st=8.55:d=0.45,loudnorm=I=-24:LRA=7:TP=-2[a_norm]',
        '-map', '[a_norm]',
        '-c:a', 'aac', '-b:a', '128k', '-ar', '48000',
        tmp_aud
    ]
    subprocess.run(cmd_aud, check=True)

    # 3. Finalize with faststart
    cmd_final = [
        'ffmpeg', '-y', '-i', tmp_vid, '-i', tmp_aud,
        '-c:v', 'copy', '-c:a', 'copy', '-movflags', '+faststart',
        LIGHT_OUT_VIDEO
    ]
    subprocess.run(cmd_final, check=True)

    # 4. Extract HD poster
    cmd_post = [
        'ffmpeg', '-y', '-ss', '00:00:00.1', '-i', LIGHT_OUT_VIDEO,
        '-vframes', '1', '-q:v', '2',
        LIGHT_OUT_POSTER
    ]
    subprocess.run(cmd_post, check=True)
    print(f"LIGHT MODE READY: {LIGHT_OUT_VIDEO}")

def process_dark():
    print("=== Processing Dark Mode: snow1.mp4 ===")
    tmp_vid = '/tmp/dark_loop_seamless.mp4'
    tmp_aud = '/tmp/dark_audio_mastered.aac'

    # 1. Seamless video loop: 20.0s -> crossfade 1.2s -> 18.8s perfect loop
    cmd_vid = [
        'ffmpeg', '-y', '-i', DARK_SRC,
        '-filter_complex',
        '[0:v]split=2[v0][v1];'
        '[v0]trim=start=1.2:end=20.0,setpts=PTS-STARTPTS[main];'
        '[v1]trim=start=0.0:end=1.2,setpts=PTS-STARTPTS[tail];'
        '[main][tail]xfade=transition=fade:duration=1.2:offset=17.6,format=yuv420p[v_out]',
        '-map', '[v_out]',
        '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p',
        tmp_vid
    ]
    subprocess.run(cmd_vid, check=True)

    # 2. Christmas bells + snowy sound audio (no human speech)
    cmd_aud = [
        'ffmpeg', '-y',
        '-stream_loop', '-1', '-i', SNOW_AMB,
        '-stream_loop', '-1', '-i', f'{SFX_DIR}/sfx_945.mp3',
        '-i', f'{SFX_DIR}/sfx_939.mp3',
        '-i', f'{SFX_DIR}/sfx_2988.mp3',
        '-filter_complex',
        '[0:a]volume=0.58,atrim=0:18.8,asetpts=PTS-STARTPTS[a_snow];'
        '[1:a]volume=0.22,atrim=0:18.8,asetpts=PTS-STARTPTS[a_sleigh];'
        '[2:a]adelay=1500|1500,volume=0.32,atrim=0:18.8,asetpts=PTS-STARTPTS[a_bell];'
        '[3:a]adelay=9500|9500,volume=0.28,atrim=0:18.8,asetpts=PTS-STARTPTS[a_chime];'
        '[a_snow][a_sleigh][a_bell][a_chime]amix=inputs=4:duration=first[a_mix];'
        '[a_mix]afade=t=in:st=0:d=0.5,afade=t=out:st=18.3:d=0.5,loudnorm=I=-24:LRA=7:TP=-2[a_norm]',
        '-map', '[a_norm]',
        '-c:a', 'aac', '-b:a', '128k', '-ar', '48000',
        tmp_aud
    ]
    subprocess.run(cmd_aud, check=True)

    # 3. Finalize with faststart
    cmd_final = [
        'ffmpeg', '-y', '-i', tmp_vid, '-i', tmp_aud,
        '-c:v', 'copy', '-c:a', 'copy', '-movflags', '+faststart',
        DARK_OUT_VIDEO
    ]
    subprocess.run(cmd_final, check=True)

    # 4. Extract HD poster
    cmd_post = [
        'ffmpeg', '-y', '-ss', '00:00:00.1', '-i', DARK_OUT_VIDEO,
        '-vframes', '1', '-q:v', '2',
        DARK_OUT_POSTER
    ]
    subprocess.run(cmd_post, check=True)
    print(f"DARK MODE READY: {DARK_OUT_VIDEO}")

if __name__ == '__main__':
    process_light()
    process_dark()
    print("ALL DONE SUCCESSFULLY!")
