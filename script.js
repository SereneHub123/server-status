
const hIP = document.querySelector('.hIP');
const hOnline = document.querySelector('.hOnline');
const hPlayers = document.querySelector('.hPlayers');
const serverLogo = document.querySelector('.hImage');
const hVersion = document.querySelector('.hVersion');
const hSoftware = document.querySelector('.hSoftware');
const hTitle = document.querySelector('.hTitle');
const serverMotd= document.querySelector('.motd');
const hInfo = document.querySelector('.hInfo');






async function fetchInfo(){
    let serverIP = hIP.value.trim().toLowerCase();
    if(!serverIP){
        hTitle.textContent = "Please Fill in the IP Address!";    
        return;
    }
    const apiURL = `https://api.mcstatus.io/v2/status/java/${serverIP}`;
    let serverData;

    try{
    const response = await fetch(apiURL);
        if(!response.ok){
            hTitle.textContent = "Error Fetching Data";
            return;
        }
        else{
         hTitle.textContent = "Minecraft Server Status";

        }
        hInfo.style.display = "flex";

        serverData = await response.json();
    }
    catch(error){
        console.error(error);
    }
    
        

    if(serverData.online === true){
        hOnline.innerHTML = '<span class="gDot"></span> Online ';


    }
    else{
        hTitle.textContent = "Make sure to use the correct IP.";    

        hOnline.innerHTML = '<span class="rDot"></span>Offline</span>';
        return;

    }

    if(serverData.icon){
        serverLogo.src = serverData.icon;

    }
    hPlayers.textContent = `Players = ${serverData.players.online}/${serverData.players.max}`;
    let formattedMotd = serverData.motd.html.replace("\n", "<br>");
    serverMotd.innerHTML = formattedMotd;

    let serverVersionSlicing = serverData.version.name_clean.indexOf(" ");
    let serverVersion = serverData.version.name_clean.slice(serverVersionSlicing);

    hVersion.textContent = `Version: ${serverVersion}`;
    let serverSoftwareSlicing;
    serverSoftwareSlicing = serverData.version.name_clean.indexOf(" ");
    let serverSoftware = serverData.version.name_clean.slice(0, serverSoftwareSlicing);

    hSoftware.textContent = `Software: ${serverSoftware}`

}


