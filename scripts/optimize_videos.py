import os
import shutil
import subprocess
import json

TEMP_DIR = "public/videos/tmp_opt"
os.makedirs(TEMP_DIR, exist_ok=True)

VIDEOS = [
    {
        "input": "public/videos/snowy-sunny.mp4",
        "output": os.path.join(TEMP_DIR, "snowy-sunny.mp4"),
        "final": "public/videos/snowy-sunny.mp4",
        "poster": "public/videos/posters/snowy-sunny.jpg",
        "crf": "26",
        "fps": "25",
        "scale": "scale=1280:720",
    },
    {
        "input": "public/videos/rainy-night.mp4",
        "output": os.path.join(TEMP_DIR, "rainy-night.mp4"),
        "final": "public/videos/rainy-night.mp4",
        "poster": "public/videos/posters/rainy-night.jpg",
        "crf": "27",
        "fps": "24",
        "scale": "scale=1280:720",
    },
    {
        "input": "public/videos/daylight-animated.mp4",
        "output": os.path.join(TEMP_DIR, "daylight-animated.mp4"),
        "final": "public/videos/daylight-animated.mp4",
        "poster": "public/videos/posters/daylight-animated.jpg",
        "crf": "27",
        "fps": "24",
        "scale": "scale=1280:720",
    },
    {
        "input": "public/videos/rainy-night-animated.mp4",
        "output": os.path.join(TEMP_DIR, "rainy-night-animated.mp4"),
        "final": "public/videos/rainy-night-animated.mp4",
        "poster": "public/videos/posters/rainy-night-animated.jpg",
        "crf": "28",
        "fps": "24",
        "scale": "scale=1280:720",
    },
    {
        "input": "public/videos/snowy-animated.mp4",
        "output": os.path.join(TEMP_DIR, "snowy-animated.mp4"),
        "final": "public/videos/snowy-animated.mp4",
        "poster": "public/videos/posters/snowy-animated.jpg",
        "crf": "27",
        "fps": "24",
        "scale": "scale=1280:720",
    },
]

def optimize_all():
    summary = []
    for item in VIDEOS:
        src = item["input"]
        tmp_out = item["output"]
        final_dest = item["final"]
        poster = item["poster"]

        orig_size = os.path.getsize(src)
        print(f"--> Optimizing {src} ({orig_size / (1024*1024):.2f} MB)...")

        cmd = [
            "ffmpeg", "-y",
            "-i", src,
            "-vf", f"{item['scale']}",
            "-r", item["fps"],
            "-c:v", "libx264",
            "-preset", "medium",
            "-crf", item["crf"],
            "-pix_fmt", "yuv420p",
            "-c:a", "aac",
            "-b:a", "96k",
            "-movflags", "+faststart",
            tmp_out
        ]
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        new_size = os.path.getsize(tmp_out)
        reduction = (1 - (new_size / orig_size)) * 100
        print(f"    Done: {new_size / (1024*1024):.2f} MB ({reduction:.1f}% reduction)")

        # Replace original with optimized version
        shutil.move(tmp_out, final_dest)

        # Generate fresh poster
        poster_cmd = [
            "ffmpeg", "-y",
            "-ss", "00:00:00.1",
            "-i", final_dest,
            "-vframes", "1",
            "-q:v", "3",
            poster
        ]
        subprocess.run(poster_cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        summary.append({
            "file": os.path.basename(final_dest),
            "orig_mb": f"{orig_size / (1024*1024):.2f}",
            "new_mb": f"{new_size / (1024*1024):.2f}",
            "reduction": f"{reduction:.1f}%"
        })

    if os.path.exists(TEMP_DIR):
        shutil.rmtree(TEMP_DIR, ignore_errors=True)

    print("\nOptimization complete:")
    print(json.dumps(summary, indent=2))

if __name__ == "__main__":
    optimize_all()
