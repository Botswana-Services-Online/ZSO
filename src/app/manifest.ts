import { MetadataRoute } from "next";

export default function manifest() : MetadataRoute.Manifest{
    return{
        id:"/",
        theme_color: "#056402",
        background_color: "#056402",
        display: "standalone",
        scope: "/",
        start_url: "/",
        name: "Zimbabwe Services Online",
        short_name: "ZSO",
        description: "Create listings online",
        icons: [
            {
                src: "/icon-192x192.png",
                sizes: "192x192",
                type: "image/png"
            },
            {
                src: "/icon-256x256.png",
                sizes: "256x256",
                type: "image/png"
            },
            {
                src: "/icon-384x384.png",
                sizes: "384x384",
                type: "image/png"
            },
            {
                src: "/icon-512x512.png",
                sizes: "512x512",
                type: "image/png"
            }
        ]
    }
}