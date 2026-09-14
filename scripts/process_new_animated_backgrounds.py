import os
import subprocess
import sys

LIGHT_SRC = '/home/etechsc/Downloads/can_make_this_more_realistc_an.mp4'
DARK_SRC = '/home/etechsc/Downloads/video_2026-09-14_10-45-01.mp4'

LIGHT_OUT_VIDEO = 'public/videos/snowy-animated.mp4'
LIGHT_OUT_POSTER = 'public/videos/posters/snowy-animated.jpg'

DARK_OUT_VIDEO = 'public/videos/rainy-night-animated.mp4'
DARK_OUT_POSTER = 'public/videos/posters/rainy-night-animated.jpg'

def get_duration(path):
    cmd = [
        'ffprobe', '-v', 'error',
        '-show_entries', 'format=duration',
        '-of', 'default=noprint_wrappers=1:nokey=1',
        path
    ]
    res = subprocess.check_output(cmd, text=True)
    return float(res.strip())

def process_video(src, out_video, out_poster, label, fade=1.0):
    print(f"=== Processing {label}: {src} ===")
    dur = get_duration(src)
    print(f"Detected duration: {dur:.3f}s")
    
    total_trimmed = int(dur * 10) / 10.0
    main_dur = total_trimmed - fade
    offset = main_dur - fade

    tmp_out = f'/tmp/processed_{label}.mp4'

    filter_complex = (
        f"[0:v]split=2[v0][v1];"
        f"[v0]trim=start={fade}:end={total_trimmed},setpts=PTS-STARTPTS[main_v];"
        f"[v1]trim=start=0:end={fade},setpts=PTS-STARTPTS[tail_v];"
        f"[main_v][tail_v]xfade=transition=fade:duration={fade}:offset={offset},format=yuv420p[out_v];"
        f"[0:a]asplit=2[a0][a1];"
        f"[a0]atrim=start={fade}:end={total_trimmed},asetpts=PTS-STARTPTS[main_a];"
        f"[a1]atrim=start=0:end={fade},asetpts=PTS-STARTPTS[tail_a];"
        f"[main_a][tail_a]acrossfade=d={fade}:c1=tri:c2=tri,loudnorm=I=-24:LRA=7:TP=-2[out_a]"
    )

    cmd = [
        'ffmpeg', '-y', '-i', src,
        '-filter_complex', filter_complex,
        '-map', '[out_v]', '-map', '[out_a]',
        '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p',
        '-c:a', 'aac', '-b:a', '192k', '-ar', '48000',
        '-movflags', '+faststart',
        tmp_out
    ]
    print("Running ffmpeg loop encoding...")
    subprocess.run(cmd, check=True)

    os.replace(tmp_out, out_video)
    print(f"Saved video to: {out_video} ({os.path.getsize(out_video)} bytes)")

    cmd_poster = [
        'ffmpeg', '-y', '-ss', '00:00:00.1', '-i', out_video,
        '-vframes', '1', '-q:v', '2',
        out_poster
    ]
    subprocess.run(cmd_poster, check=True)
    print(f"Saved poster to: {out_poster} ({os.path.getsize(out_poster)} bytes)")

if __name__ == '__main__':
    process_video(LIGHT_SRC, LIGHT_OUT_VIDEO, LIGHT_OUT_POSTER, "light")
    process_video(DARK_SRC, DARK_OUT_VIDEO, DARK_OUT_POSTER, "dark")
    print("\nSUCCESS! Both light and dark animated backgrounds are ready.")
