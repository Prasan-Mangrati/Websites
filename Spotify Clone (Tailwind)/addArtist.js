document.getElementById("addArtistButton").addEventListener("click", function () {
    let artistName = prompt("Enter Artist Name:");
    if (artistName) {
        //create link for artist photo
        link = prompt("Enter the link of artist photo")
        let image = document.createElement("img");
        image.classList.add("rounded-full", "w-12", "h-12");
        image.src = link;


        let artistContainer = document.getElementById("artistContainer");

        // Create card element
        let card = document.createElement("div");
        card.classList.add(
            "card", "p-2", "text-white", "flex", "items-center", "gap-5", "hover:bg-[rgb(46,45,45)]","rounded-xl", "cursor-pointer"
        );

        let footer = document.createElement("div");
        footer.innerText = prompt("Enter the description");
        footer.classList.add("font-extralight", "text-white", "text-sm");

        let name = document.createElement("div");
        name.innerText = artistName;
        name.classList.add("text-xl", "text-green-500", "text-sm");
        name.appendChild(footer)


        //create profile
        let profile = document.createElement("div");
        profile.classList.add("flex", "gap-5")
        profile.appendChild(image)
        profile.appendChild(name)


        card.appendChild(profile)
        artistContainer = document.getElementById("artistContainer")
        artistContainer.appendChild(card)


    }
});


document.getElementById("play").addEventListener("click",function(){
    document.getElementById("play").style.display="none";
    const pause =document.getElementById("pause");
    pause.style.display="block";

})

document.getElementById("pause").addEventListener("click",function(){
    document.getElementById("play").style.display="block";
    const pause =document.getElementById("pause");
    pause.style.display="none";
})

