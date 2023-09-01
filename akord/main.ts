import {Akord, Auth} from "@akord/akord-js";

async function main() {
    const {wallet} = await Auth.signIn("0x11a1@proton.me", "W5HxPyzi_g2QopdZ46af");
    const akord = await Akord.init(wallet);

    const vaults = await akord.vault.listAll();
    console.log(JSON.stringify(vaults));
}

main();
