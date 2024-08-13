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
            'div[aria-label="Invite"]',
            'div[aria-label="Send Invitation"]',
            'div[aria-label="Inviter"]',
            'div[aria-label="Einladen"]',
            'div[aria-label="Invita"]',
            'div[aria-label="Invitar"]'
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
