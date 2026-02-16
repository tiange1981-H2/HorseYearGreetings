import requests
import os

# User-Agent to mimic a browser
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

downloads = [
    {
        "url": "https://image.pollinations.ai/prompt/3D%20isometric%20diagram%20Power%20to%20Methane%20system%20integrating%20Electricity%20Gas%20and%20Heat%20networks%20Wind%20turbines%20powering%20electrolysis%20Waste%20heat%20from%20methanation%20collected%20for%20district%20heating%20pipes%20Green%20methane%20into%20gas%20grid%20Clean%20style?width=800&height=1200&nologo=true",
        "file": "assets/bg_methane_final.jpg"
    },
    {
        "url": "https://image.pollinations.ai/prompt/3D%20isometric%20illustration%20wind%20turbines%20solar%20panels%20powering%20electrolyzer%20hydrogen%20and%20captured%20CO2%20entering%20methanol%20synthesis%20plant%20then%20MTO%20unit%20producing%20olefins%20green%20blue%20industrial%20style?width=800&height=1200&nologo=true",
        "file": "assets/bg_methanol_final.jpg"
    },
    {
        "url": "https://image.pollinations.ai/prompt/3D%20isometric%20illustration%20renewable%20energy%20hydrogen%20production%20CO2%20capture%20unit%20Fischer-Tropsch%20synthesis%20reactor%20producing%20green%20kerosene%20filling%20jet%20fuel%20tanks%20airplane%20bright%20lighting?width=800&height=1200&nologo=true",
        "file": "assets/bg_liquid_final.jpg"
    },
    {
        "url": "https://image.pollinations.ai/prompt/3D%20isometric%20illustration%20wind%20solar%20farm%20hydrogen%20production%20underground%20salt%20cavern%20cutaway%20view%20hydrogen%20storage%20flow%20to%20gas%20turbine%20power%20plant%20electricity%20grid%20seasonal%20storage?width=800&height=1200&nologo=true",
        "file": "assets/bg_h2power_final.jpg"
    }
]

for item in downloads:
    print(f"Downloading {item['file']}...")
    try:
        response = requests.get(item['url'], headers=headers, timeout=30)
        if response.status_code == 200:
            with open(item['file'], 'wb') as f:
                f.write(response.content)
            print(f"Success: {item['file']}")
        else:
            print(f"Failed: {item['file']} (Status {response.status_code})")
    except Exception as e:
        print(f"Error downloading {item['file']}: {e}")
