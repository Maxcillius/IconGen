interface dimension {
    [size: string]: string
}

const dall2: dimension = {
    "small": "256x256",
    "medium": "512x512",
    "large": "1024x1024"
}

const dall3: dimension = {
    "medium": "1024x1024",
    "large": "1024x1792",
}

export { dall2, dall3 }