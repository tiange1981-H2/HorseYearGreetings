const fs = require('fs');
const https = require('https');
const path = require('path');

const downloads = [
    {
        // 1. Power to Methane: Wind/Solar -> Electrolyzer -> Hydrogen -> CO2 Capture -> Methanation -> Gas Grid
        url: "https://image.pollinations.ai/prompt/3D%20isometric%20illustration%20green%20energy%20system%20wind%20turbines%20solar%20panels%20electrolysis%20hydrogen%20pipes%20CO2%20capture%20methanation%20reactor%20injecting%20green%20methane%20into%20yellow%20pipeline%20grid%20clean%20background%20educational%20diagram?width=800&height=1200&nologo=true",
        file: "assets/bg_methane_3d.jpg"
    },
    {
        // 2. Power to Methanol: Wind/Solar -> Electrolyzer -> Hydrogen -> CO2 Capture -> Methanol Synthesis -> MTO -> Olefins
        url: "https://image.pollinations.ai/prompt/3D%20isometric%20illustration%20wind%20turbines%20solar%20panels%20powering%20electrolyzer%20hydrogen%20and%20captured%20CO2%20entering%20methanol%20synthesis%20plant%20then%20MTO%20unit%20producing%20olefins%20green%20blue%20industrial%20style?width=800&height=1200&nologo=true",
        file: "assets/bg_methanol_3d.jpg"
    },
    {
        // 3. Power to Liquid: Wind/Solar -> Electrolyzer -> Hydrogen -> CO2 Capture -> Fischer-Tropsch -> Green Kerosene/Jet Fuel
        url: "https://image.pollinations.ai/prompt/3D%20isometric%20illustration%20renewable%20energy%20hydrogen%20production%20CO2%20capture%20unit%20Fischer-Tropsch%20synthesis%20reactor%20producing%20green%20kerosene%20filling%20jet%20fuel%20tanks%20airplane%20bright%20lighting?width=800&height=1200&nologo=true",
        file: "assets/bg_liquid_3d.jpg"
    },
    {
        // 4. Power to H2 to Power: Wind/Solar -> Electrolyzer -> Salt Cavern Storage -> H2 Gas Turbine -> Power Grid
        url: "https://image.pollinations.ai/prompt/3D%20isometric%20illustration%20wind%20solar%20farm%20hydrogen%20production%20underground%20salt%20cavern%20cutaway%20view%20hydrogen%20storage%20flow%20to%20gas%20turbine%20power%20plant%20electricity%20grid%20seasonal%20storage?width=800&height=1200&nologo=true",
        file: "assets/bg_h2power_3d.jpg"
    }
];

downloads.forEach(item => {
    const filePath = path.join(__dirname, item.file);
    console.log(`Downloading ${item.url} to ${filePath}...`);

    https.get(item.url, response => {
        if (response.statusCode === 200) {
            const file = fs.createWriteStream(filePath);
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Finished ${item.file}`);
            });
        } else {
            console.error(`Failed ${item.file}: Status ${response.statusCode}`);
            response.resume();
        }
    }).on('error', err => {
        console.error(`Error ${item.file}: ${err.message}`);
    });
});
