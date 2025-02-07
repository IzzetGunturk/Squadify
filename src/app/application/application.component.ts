import { Component } from '@angular/core';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss'
})
export class ApplicationComponent {
  
  playersList: string[] = [];
  shuffledList: string[] = [];
  playerName: string = "";
  errorMessage: string = "";
  optionsNumberForTeams: number[] = [2,3,4,5,6,7,8,9,10,11,12];
  selectedStandardNumberForTeams: number = 2;
  generatedTeams: string[][] = [];
  loadingSpinner: boolean = false;
  darkLightMode: boolean = false;

  addPlayerToList() {
    if (this.playerName == "") {
      this.errorMessage = "Fill in a name";
    }
    else {
      this.playersList.push(this.playerName);
      this.playerName = "";
      console.log(this.playersList.length);
      this.errorMessage = "";
    }
  }

  deletePlayerFromList(index: number) {
    this.playersList.splice(index, 1);
  }

  generateTeams() {
    if (this.playersList.length < this.selectedStandardNumberForTeams) {
      this.errorMessage = "Not enough players..."
    }
    else {
      this.loadingSpinner = true;
      setTimeout(() => {
        this.shuffledList = [...this.playersList];

        //shuffle
        for (let i = this.shuffledList.length - 1; i > 0; i--) { 
          const j = Math.floor(Math.random() * (i + 1)); 
          [this.shuffledList[i], this.shuffledList[j]] = [this.shuffledList[j], this.shuffledList[i]];
        }
        
        // making empty array of arrays (teams) of selectedStandardNumberForTeams
        const teams: string[][] = Array.from({ length: this.selectedStandardNumberForTeams }, () =>[]);
        
        this.shuffledList.forEach((player, index) => {
          teams[index % this.selectedStandardNumberForTeams].push(player);
        });

        this.generatedTeams = teams;
        this.errorMessage = "";
        this.loadingSpinner = false;
      }, 1000);
    }
  }

  toggleDarkLightMode() {
    this.darkLightMode = !this.darkLightMode; //darkLightMode = DARK

    localStorage.setItem("darkLightMode", JSON.stringify(this.darkLightMode));

    if (this.darkLightMode) {
      document.body.classList.add("__lightmode");
    }
    else {
      document.body.classList.remove("__lightmode");
    }
  }

  ngOnInit() {
    const savedMode = localStorage.getItem("darkLightMode")

    if (savedMode !== null) {
      this.darkLightMode = JSON.parse(savedMode);
    }
    else {
      this.darkLightMode = false;
    }

    if (this.darkLightMode) {
      document.body.classList.add("__lightmode");
    }
    else {
      document.body.classList.remove("__lightmode");
    }
  }
  

  constructor() {
    
  }
}
