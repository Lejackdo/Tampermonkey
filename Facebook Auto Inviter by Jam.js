// ==UserScript==
// @name         Facebook Auto Inviter by Jam
// @namespace    https://www.linkedin.com/in/jacquesantoinemarteau/
// @version      1.5
// @description  Automatically invite people who reacted to your Facebook posts to like your page without scrolling and delay, and check for new buttons every second with a total counter since script start at the bottom of the screen.
// @match        *://business.facebook.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let totalInvites = 0; // Variable to store total invites since script start

    function inviteAll() {
      const inviteButtonSelectors = [
            'div[aria-label="Invite"]',                 // English
            'div[aria-label="Send Invitation"]',        // English
            'div[aria-label="Inviter"]',                // French
            'div[aria-label="Einladen"]',               // German
            'div[aria-label="Invita"]',                 // Italian
            'div[aria-label="Invitar"]',                // Spanish
            'div[aria-label="Convidar"]',               // Portuguese
            'div[aria-label="Uitnodigen"]',             // Dutch
            'div[aria-label="Zaproś"]',                 // Polish
            'div[aria-label="Пригласить"]',             // Russian
            'div[aria-label="招待"]',                   // Japanese
            'div[aria-label="邀请"]',                   // Chinese Simplified
            'div[aria-label="邀請"]',                   // Chinese Traditional
            'div[aria-label="Davet Et"]',               // Turkish
            'div[aria-label="Pozvat"]',             // Czech
            'div[aria-label="Kutsu"]',              // Finnish
            'div[aria-label="Pozvánka"]',           // Slovak
            'div[aria-label="초대"]',                // Korean
            'div[aria-label="Undang"]',             // Indonesian
            'div[aria-label="הזמן"]',               // Hebrew
            'div[aria-label="دعوة"]',               // Arabic
            'div[aria-label="Bjud in"]',            // Swedish
            'div[aria-label="Meghívás"]',           // Hungarian
            'div[aria-label="Inviter"]',            // Norwegian
            'div[aria-label="Zvát"]',               // Slovak
            'div[aria-label="Festa"]',              // Icelandic
            'div[aria-label="Kvietimas"]',          // Lithuanian
            'div[aria-label="Pakvietimas"]',        // Lithuanian
            'div[aria-label="Πρόσκληση"]',          // Greek
            'div[aria-label="Poziv"]',              // Serbian
            'div[aria-label="Chiamare"]',           // Italian variant
            'div[aria-label="Mời"]',                // Vietnamese
            'div[aria-label="Pozvati"]',            // Croatian
            'div[aria-label="Aicināt"]',            // Latvian
            'div[aria-label="Kutsuda"]',            // Estonian
            'div[aria-label="Pakviesti"]',          // Lithuanian
            'div[aria-label="เชิญ"]',               // Thai
            'div[aria-label="आमंत्रण"]',           // Hindi
            'div[aria-label="მიწვევა"]',          // Georgian
            'div[aria-label="Pozivnik"]',           // Bosnian
            'div[aria-label="Kvietimas"]',          // Lithuanian
            'div[aria-label="Cuir cuireadh"]'       // Irish
        ];


        let inviteButtons = [];
        inviteButtonSelectors.forEach(selector => {
            inviteButtons = inviteButtons.concat(Array.from(document.querySelectorAll(selector)));
        });

        let invitedCount = 0;
        for (let i = 0; i < inviteButtons.length; i++) {
            if (inviteButtons[i]) {
                inviteButtons[i].click();
                invitedCount++;
            }
        }

        totalInvites += invitedCount; // Update total invites
        updateCounter(totalInvites);
    }

    function updateCounter(overallTotal) {
        let counterDiv = document.querySelector("#invite_counter");
        if (!counterDiv) {
            counterDiv = document.createElement('div');
            counterDiv.id = 'invite_counter';
            counterDiv.style = 'position:fixed;bottom:0;width:100%;max-height:75px;background-color:#333;color:white;text-align:center;z-index:9999;font-size:20px;padding:15px;';
            document.body.appendChild(counterDiv);
        }
        counterDiv.innerHTML = `Invité au total: ${overallTotal} personnes`;
    }

    function checkForInviteButtons() {
        inviteAll();
        setTimeout(checkForInviteButtons, 1000); // Vérifier chaque seconde
    }

    window.addEventListener('load', checkForInviteButtons);

})();
