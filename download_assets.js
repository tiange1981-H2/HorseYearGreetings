const fs = require('fs');
const https = require('https');
const path = require('path');

const downloads = [
    {
        url: "https://image.pollinations.ai/prompt/realistic%20vertical%20wind%20turbine%20farm%20green%20grass%20blue%20sky%20cinematic%20lighting?width=800&height=1200&nologo=true",
        file: "assets/bg_wind.jpg"
    },
    {
        url: "https://image.pollinations.ai/prompt/realistic%20vertical%20solar%20panels%20farm%20sunlight%20blue%20sky%20high%20resolution?width=800&height=1200&nologo=true",
        file: "assets/bg_solar.jpg"
    },
    {
        url: "https://image.pollinations.ai/prompt/realistic%20modern%20green%20hydrogen%20chemical%20plant%20industrial%20pipes%20futuristic%20blue%20sky?width=800&height=1200&nologo=true",
        file: "assets/bg_plant.jpg"
    }
];

downloads.forEach(item => {
    const filePath = path.join(__dirname, item.file);
    console.log(`Downloading ${item.url} to ${filePath}...`);

    const request = https.get(item.url, response => {
        console.log(`Response status for ${item.file}: ${response.statusCode}`);
        if (response.statusCode !== 200) {
            console.error(`Failed to download ${item.file}: Status ${response.statusCode}`);
            response.resume(); // Consume response data to free up memory
            return;
        }

        const file = fs.createWriteStream(filePath);
        response.pipe(file);

        file.on('finish', () => {
            file.close();
            console.log(`Finished downloading ${item.file}`);
        });
    }).on('error', err => {
        console.error(`Error downloading ${item.file}: ${err.message}`);
    });
});
