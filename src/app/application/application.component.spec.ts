import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { ApplicationComponent } from './application.component';

import { FormsModule } from '@angular/forms'; 

describe('ApplicationComponent', () => {
  let component: ApplicationComponent;
  let fixture: ComponentFixture<ApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationComponent],
      imports: [FormsModule] // ⬅️ deze toevoegen
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addPlayerToList()', () => {
    it('should add a player to the list if name is provided', () => {
      
      //given
      component.playerName = 'Cristiano Ronaldo'

      // when
      component.addPlayerToList();

      //then
      expect(component.playersList).toContain('Cristiano Ronaldo');
      expect(component.playerName).toBe('');
    });

    it('should show error when playername is empty', () => {
      
      //given
      component.playerName = ''

      // when
      component.addPlayerToList();

      //then
      expect(component.errorMessage).toBe('Fill in a name');
    });
  });

  describe('deletePlayerFromList()', () => {
    it('should delete player from list', () => {
      
      //given
      component.playersList = ['Cristiano Ronaldo','Victor Osimhen'];

      // when
      component.deletePlayerFromList(1);

      //then
      expect(component.playersList).toEqual(['Cristiano Ronaldo']);
    });
  });

  describe('generateTeams()', () => {
    it('should show error when not enough players', () => {
      
      //given
      component.playersList = ['Cristiano Ronaldo'];
      component.selectedStandardNumberForTeams = 2;

      // when
      component.generateTeams();

      //then
      expect(component.errorMessage).toBe('Not enough players...');
    });

    it('should generate teams', fakeAsync(() => {
      
      //given
      component.playersList = ['Cristiano Ronaldo', 'Victor Osimhen', 'Ousmane Dembele', 'Neymar Da Silva', 'Zlatan Ibrahimovic', 'Allan Saint-Maximin'];
      component.selectedStandardNumberForTeams = 2;

      // when
      component.generateTeams();

      //then
      expect(component.loadingSpinner).toBeTrue();

      tick(1000);

      expect(component.generatedTeams.length).toBe(2);
      expect(component.generatedTeams.flat().sort()).toEqual(['Cristiano Ronaldo', 'Victor Osimhen', 'Ousmane Dembele', 'Neymar Da Silva', 'Zlatan Ibrahimovic', 'Allan Saint-Maximin'].sort());
      expect(component.loadingSpinner).toBeFalse();
      expect(component.errorMessage).toBe('');
    }));
  });

  describe('toggleDarkLightMode()', () => {
    it('should toggle dark mode', () => {
      
      //given
      spyOn(localStorage, 'setItem');
      component.darkLightMode = false;

      // when
      component.toggleDarkLightMode();

      //then
      expect(component.darkLightMode).toBeTrue();
      expect(localStorage.setItem).toHaveBeenCalledWith('darkLightMode', 'true');
    });
  });
});
