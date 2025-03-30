interface dimension {
    [size: string]: string
}

const dall2: dimension = {
    "small": "256x256",
    "medium": "512x512",
    "large": "1024x1024"
}

const dall3: dimension = {
    "small": "1024x1024",
    "medium": "1024x1792",
    "large": "1792x1024"
}

export { dall2, dall3 }