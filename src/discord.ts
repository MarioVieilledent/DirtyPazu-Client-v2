import { writable, type Writable } from "svelte/store";
import { LOCAL_STORAGE_DISCORD_USER } from "./types";

export let discordConnected: Writable<boolean> = writable(false);
export let discordUser: Writable<DicordUser> = writable<DicordUser>();

const savedDiscordUser = localStorage.getItem(LOCAL_STORAGE_DISCORD_USER);
if (savedDiscordUser) {
    discordConnected.set(true);
    discordUser.set(JSON.parse(savedDiscordUser) as DicordUser);
}

export function getDiscordAvatarUrl(di: DicordUser): string {
    return `https://cdn.discordapp.com/avatars/${di.id}/${di.avatar}.png`
}

type DicordUser = {
    id: string;
    username: string;
    global_name: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner: string;
    banner_color: string;
    accent_color: string;
    locale: string;
    mfa_enabled: boolean;
    premium_type: number;
    avatar_decoration: string;
}