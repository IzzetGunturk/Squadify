import { Component } from '@angular/core';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss'
})
export class ApplicationComponent {
  
  playerName: string = '';
  playersList: string[] = [];
  errorMessage: string = ''

  shuffledList: string[] =[];
  optionsNumberForTeams: number[] = [2,3,4,5,6,7,8,9,10,11,12];
  selectedStandardNumberForTeams: number = 2;
  generatedTeams: string[][] = []; // 2 arrays
  savedTeams: string[][][] = [];

  loadingSpinner: boolean = false;
  darkLightMode: boolean = false;

  addPlayerToList() {
    if (this.playerName == '') {
      this.errorMessage = 'Fill in a name'
    }
    else {
      this.playersList.push(this.playerName);
      this.playerName = '';
      this.errorMessage = '';
    }
  }

  deletePlayerFromList(index: number) {
    this.playersList.splice(index, 1);
  }

  resetList() {
    this.playersList = [];
  }

  generateTeams() {
    if (this.playersList.length < this.selectedStandardNumberForTeams) {
      this.errorMessage = "Not enough players..."
    }
    else {
      this.loadingSpinner = true;

      setTimeout(() => {
        this.shuffledList = [...this.playersList];

        // Fisher-Yates shuffle
        for (let i = this.shuffledList.length - 1; i > 0; i--) { 
          const j = Math.floor(Math.random() * (i + 1)); 
          [this.shuffledList[i], this.shuffledList[j]] = [this.shuffledList[j], this.shuffledList[i]];
        }

        // making empty array of arrays (teams) of selectedStandardNumberForTeams
        const teams: string[][] = Array.from({ length: this.selectedStandardNumberForTeams }, () =>[]);

        for (let i = 0; i < this.shuffledList.length; i++) { // checking each player in the list
          const teamIndex = i % this.selectedStandardNumberForTeams; // a%b (what is the rest of a if you divide it by b) 1%3=1 2%3=2 6%3=0 5%3=2
          teams[teamIndex].push(this.shuffledList[i]); // teams[1].push('Ronaldo');
        }

        this.generatedTeams = teams;
        this.loadingSpinner = false;
        this.errorMessage = "";
        
      }, 1000);
    }
  }

  saveGeneratedTeams() {
    this.savedTeams.push(this.generatedTeams.map(team => [...team]));

    localStorage.setItem("savedTeams", JSON.stringify(this.savedTeams));
  }

  deleteSavedTeam(index: number) {
    this.savedTeams.splice(index, 1);

    localStorage.setItem("savedTeams", JSON.stringify(this.savedTeams));
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

    const savedTeamsLocalStorage = localStorage.getItem("savedTeams");

    if (savedTeamsLocalStorage) {
      this.savedTeams = JSON.parse(savedTeamsLocalStorage);
    }
  }  

  constructor() {
    
  }
}
