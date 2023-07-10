import { writable, type Writable } from "svelte/store";
import { LOCAL_STORAGE_DISCORD_USER } from "./types";

export let discordConnected: Writable<boolean> = writable(false);
export let user: Writable<User> = writable<User>();

const savedDiscordUser = localStorage.getItem(LOCAL_STORAGE_DISCORD_USER);
if (savedDiscordUser) {
    // discordConnected.set(true);
    // user.set(JSON.parse(savedDiscordUser) as User);
}

export function getDiscordAvatarUrl(user: User): string {
    return (user?.discord?.id && user?.discord?.avatar) ? `https://cdn.discordapp.com/avatars/${user.discord.id}/${user.discord.avatar}.png` : '';
}

type User = {
    discord: DicordUser,
    roles: Role[],
    xp: number,
    money: number,
    connections: string[]
}

type DicordUser = {
    email: string; // email as unique ID
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

type Role = 'default' | 'admin' | string;