mp.events.addCommand('badge', (player, fullText, subCommand, targetPlayerName) => {
    if (subCommand === 'show') {
        if (player.hasPoliceBadge) { // Proveravamo da li igrač ima značku
            showBadge(player);
        } else {
            player.outputChatBox("Nemate policijsku značku!");
        }
    } else if (subCommand === 'remove' && targetPlayerName) {
        let targetPlayer = mp.players.toArray().find(p => p.name === targetPlayerName);
        if (targetPlayer) {
            targetPlayer.hasPoliceBadge = false;
            player.outputChatBox(`Oduzeli ste policijsku značku igraču ${targetPlayer.name}!`);
            targetPlayer.outputChatBox("Vaša policijska značka je oduzeta!");
        } else {
            player.outputChatBox("Igrač nije pronađen!");
        }
    } else {
        player.outputChatBox("Korišćenje: /badge show ili /badge remove [ime igrača]");
    }
});

function showBadge(player) {
    // Kod za prikazivanje značke ostalim igračima
    mp.players.broadcast(`${player.name} pokazuje svoju policijsku značku!`);
    // Možete dodati i druge efekte kao što su animacije, zvuk itd.
}

// Dodavanje događaja za F3 taster
mp.events.add('showBadgeKey', (player) => {
    if (player.hasPoliceBadge) {
        showBadge(player);
    } else {
        player.outputChatBox("Nemate policijsku značku!");
    }
});