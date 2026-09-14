import os, subprocess

SOURCE_VIDEO = '/home/etechsc/.gemini/antigravity/brain/08952c1c-3b33-4237-942a-f385ac627bd0/scratch/tiktok_refs/00001_7582469600755862814.mp4'
SNOW_AUDIO = '/home/etechsc/.gemini/antigravity/brain/01f0fcc6-1156-437b-8ae6-c46de562e6a2/scratch/audio_snow_ambient.aac'

OUTPUT_VIDEO = 'public/videos/snowy-animated.mp4'
OUTPUT_POSTER = 'public/videos/posters/snowy-animated.jpg'

def render():
    print("=== Processing Daytime Winter Market Walk Background ===")
    raw_clip = '/tmp/market_scene_raw.mp4'
    seamless_video = '/tmp/market_seamless_video.mp4'
    mastered_audio = '/tmp/market_mastered_audio.aac'

    # 1. Extract Scene C (9.85s to 14.45s) with 16:9 crop & 1280x720 scaling
    # y=920 keeps all walking people, stalls, goods, and town background
    print("1. Extracting and framing 16:9 market walk...")
    cmd_extract = [
        'ffmpeg', '-y', '-ss', '00:00:09.85', '-to', '00:00:14.45', '-i', SOURCE_VIDEO,
        '-vf', 'crop=1080:608:0:920,scale=1280:720,setsar=1',
        '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-an',
        raw_clip
    ]
    subprocess.run(cmd_extract, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # 2. Build 3-iteration seamless crossfade loop (3.8s * 3 = 11.4s)
    # Tail 0.8s is crossfaded over head to ensure 100% smooth loop
    print("2. Constructing seamless forward loop...")
    filter_loop = (
        '[0:v]split=2[v0][v1];'
        '[v0]trim=start=0.8:end=4.6,setpts=PTS-STARTPTS[main];'
        '[v1]trim=start=0:end=0.8,setpts=PTS-STARTPTS[tail];'
        '[main][tail]xfade=transition=fade:duration=0.8:offset=3.0[unit];'
        '[unit]split=3[u1][u2][u3];'
        '[u1][u2][u3]concat=n=3:v=1:a=0[full_loop]'
    )
    cmd_loop = [
        'ffmpeg', '-y', '-i', raw_clip,
        '-filter_complex', filter_loop,
        '-map', '[full_loop]',
        '-c:v', 'libx264', '-preset', 'slow', '-crf', '19', '-pix_fmt', 'yuv420p',
        seamless_video
    ]
    subprocess.run(cmd_loop, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # Get exact video duration for audio sync
    dur_out = subprocess.check_output([
        'ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', seamless_video
    ]).decode().strip()
    duration = float(dur_out)
    print(f"Video loop duration: {duration:.2f} seconds")

    # 3. Master ambient audio to match duration with gentle fade in/out
    print("3. Mastering ambient audio loop...")
    cmd_audio = [
        'ffmpeg', '-y', '-stream_loop', '-1', '-i', SNOW_AUDIO,
        '-t', str(duration),
        '-af', f'afade=t=in:st=0:d=0.4,afade=t=out:st={duration - 0.4}:d=0.4,loudnorm=I=-24:LRA=7:TP=-2',
        '-c:a', 'aac', '-b:a', '128k',
        mastered_audio
    ]
    subprocess.run(cmd_audio, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # 4. Multiplex video and audio with faststart for instant streaming
    print("4. Finalizing web video with +faststart...")
    cmd_final = [
        'ffmpeg', '-y', '-i', seamless_video, '-i', mastered_audio,
        '-c:v', 'copy', '-c:a', 'copy', '-movflags', '+faststart',
        OUTPUT_VIDEO
    ]
    subprocess.run(cmd_final, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # 5. Extract first-frame HD poster
    print("5. Extracting HD poster...")
    cmd_poster = [
        'ffmpeg', '-y', '-ss', '00:00:00.1', '-i', OUTPUT_VIDEO,
        '-vframes', '1', '-q:v', '2',
        OUTPUT_POSTER
    ]
    subprocess.run(cmd_poster, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    print(f"SUCCESS: Created {OUTPUT_VIDEO} and {OUTPUT_POSTER}")

if __name__ == '__main__':
    render()
