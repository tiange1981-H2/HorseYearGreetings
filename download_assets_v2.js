const fs = require('fs');
const https = require('https');
const path = require('path');

const downloads = [
    {
        // 1. Power to Methane: wind turbines + pipes/gas
        url: "https://loremflickr.com/800/1200/wind,turbine,pipeline",
        file: "assets/bg_methane.jpg"
    },
    {
        // 2. Power to Methanol: chemical plant + industry
        url: "https://loremflickr.com/800/1200/chemical,plant,industry",
        file: "assets/bg_methanol.jpg"
    },
    {
        // 3. Power to Liquid: refinery + fuel
        url: "https://loremflickr.com/800/1200/refinery,fuel,aircraft",
        file: "assets/bg_liquid.jpg"
    },
    {
        // 4. Power to H2 to Power: electrical grid + storage
        url: "https://loremflickr.com/800/1200/electricity,grid,storage",
        file: "assets/bg_h2power.jpg"
    }
];

downloads.forEach(item => {
    const filePath = path.join(__dirname, item.file);
    console.log(`Downloading ${item.url} to ${filePath}...`);

    // Follow redirects for LoremFlickr
    https.get(item.url, response => {
        if (response.statusCode === 301 || response.statusCode === 302) {
            https.get(response.headers.location, redirectResponse => {
                redirectResponse.pipe(fs.createWriteStream(filePath))
                    .on('finish', () => console.log(`Finished ${item.file}`));
            });
        } else {
            response.pipe(fs.createWriteStream(filePath))
                .on('finish', () => console.log(`Finished ${item.file}`));
        }
    }).on('error', err => {
        console.error(`Error ${item.file}: ${err.message}`);
    });
});
