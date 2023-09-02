import {Akord, Auth} from "@akord/akord-js";

async function main() {
    const {wallet} = await Auth.signIn("", "");
    const akord = await Akord.init(wallet);

    const vaults = await akord.vault.listAll();
    console.log(JSON.stringify(vaults));
}

main();
