//Ovaj sistem omogucava prikaz znacke Policjskog sluzbenika, dodao sam mogucnost da mogu da se dodele znacke samo iz niza Znacke. Takodje dodao sam neku
//animaciju, cilj ovog sistema je da samo Nacelnici,Lider i Zamenik Diretora mogu menjati znacku, oduzimanje znacke neka se vrsi kada se igrac izbaci iz organzacije.
//Nisam testirao sistem, nemam host tako da evo koda pa ga prilagodi i testiraj ukoliko imas volje, mozda postoji neki bug ali eto uradio sam sistem ti ga Prilagodi, Srecno :D


const znacke = [    
    "#100", "#101", "#102", "#104", "#105", "#106", "#107", 
    "ZNACKA", "JRM-1", "JRM-2", "JRM-3", "JRM-4", "JRM-5", "JRM-6", "JRM-7", "JRM-8", "JRM-9", "JRM-10", 
    "IJ-1", "IJ-2", "IJ-3", "IJ-4", "IJ-5", "IJ-6", "IJ-7", 
    "UKP-1", "UKP-2", "UKP-3", "UKP-4", 
    "SJ-1", "SJ-2", "SJ-3", "SJ-4", "SJ-5", "SJ-6", "SJ-7", 
    "P-1", "P-2", "P-3", "P-4", "P-5"
];

mp.events.addCommand('promeniznacku', (igrac, celaKomanda, ciljaniIgrac, novaZnacka) => {
    // Ovde dodaj permisije da mogu da menjaju Direktor, Zamenik Direktora, Nacelnik
    if (!igrac.isLeader) {
        igrac.outputChatBox("Samo lider admina može menjati značke policajcima!");
        return;
    }

    // Provera da li je uneta ispravna značka, moguce je uneti samo definisanu znacku
    if (!znacke.includes(novaZnacka)) {
        igrac.outputChatBox("Uneta značka nije validna!");
        return;
    }
    let ciljaniIgrac = mp.players.toArray().find(p => p.name === ciljaniIgrac);
    if (ciljaniIgrac) {
        ciljaniIgrac.hasPoliceBadge = true;
        ciljaniIgrac.policeBadge = novaZnacka;
        igrac.outputChatBox(`Promenili ste značku igraču ${ciljaniIgrac.name} u ${novaZnacka}!`);
        ciljaniIgrac.outputChatBox(`Vaša policijska značka je promenjena u ${novaZnacka} od strane lidera.`);
    } else {
        igrac.outputChatBox("Igrač nije pronađen!");
    }
});

mp.events.addCommand('prikaziznacku', (igrac, celaKomanda, podKomanda, ciljaniIgrac) => {
    if (podKomanda === 'prikazi') {
        if (igrac.hasPoliceBadge) { // Vrsi se provera da li igrac ima znacku
            prikaziZnacku(igrac);
        } else {
            igrac.outputChatBox("Nemate policijsku značku!");
        }
    } else if (podKomanda === 'ukloni' && ciljaniIgrac) {
        let ciljaniIgrac = mp.players.toArray().find(p => p.name === ciljaniIgrac);
        if (ciljaniIgrac) {
            ciljaniIgrac.hasPoliceBadge = false;
            igrac.outputChatBox(`Oduzeli ste policijsku značku igraču ${ciljaniIgrac.name}!`);
            ciljaniIgrac.outputChatBox("Vaša policijska značka je oduzeta!");
        } else {
            igrac.outputChatBox("Igrač nije pronađen!");
        }
    } else {
        igrac.outputChatBox("TEXT TEXT, dodaj samo koji text ovde zelis");
    }
});

function prikaziZnacku(igrac) {

    igrac.call('prikaziSlikuZnacke');
   
    igrac.playAnimation('anim@mp_player_intuppersurrender', 'idle_a', 8, 49);   //Promeni animaciju
}

mp.events.add('prikaziZnackuTaster', (igrac) => {
    if (igrac.hasPoliceBadge) {
        prikaziZnacku(igrac);
    } else {
        igrac.outputChatBox("Nemate policijsku značku!");
    }
});
mp.events.add('prikaziSlikuZnacke', (igrac) => {
    const putanjaDoSlike = "putanja/do/vasih/slika/znacki.png"; // Neka Kris ili neko uradi dobar dizajn za
    const sirinaZnacke = 100; 
    const visinaZnacke = 100; 
    mp.game.graphics.drawSprite("znacka", "znacka", 0.5, 0.5, sirinaZnacke, visinaZnacke, 0, 255, 255, 255, 255);
});



// Credits by Dzony