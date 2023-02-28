import { Component } from '@angular/core';
const MAX_SCORE = 20;

@Component({
  selector: 'app-pig-game',
  templateUrl: './pig-game.component.html',
  styles: [
  ]
})
export class PigGameComponent {
  game_started = false;
  game_over = false;
  img = ''
  players: any = {
    player_1: {
      active_player: true,
      current_score: 0,
      final_score: 0,
      winner: false
    },
    player_2: {
      active_player: false,
      current_score: 0,
      final_score: 0,
      winner: false
    },
  }

  // constructor(){}
  getActivePlayer(): any{
    for (const [key] of Object.entries(this.players)) {
      if (this.players[key].active_player) {
        return key
      }
    }
  }

  throwDice() {
    this.game_started = true;
    const num = Math.floor(Math.random() * 6) + 1;
    this.img = `./assets/img/dice-${num}.png`;
    const active_player : any = this.getActivePlayer();
    if (num != 1) {
      this.players[active_player].current_score += num;
      return
    }
    this.players[active_player].current_score = 0;
    this.switchActivePlayer();
  }

  endTurn() {
    const active_player : any = this.getActivePlayer();
    this.players[active_player].final_score += this.players[active_player].current_score;
    this.players[active_player].current_score = 0;
    // GAME OVER
    if (this.players[active_player].final_score >= MAX_SCORE) {
      this.players[active_player].winner = true;
      this.game_over = true;
      return
    }
    this.switchActivePlayer();
  }

  switchActivePlayer(){
    this.players.player_1.active_player = !this.players.player_1.active_player;
    this.players.player_2.active_player = !this.players.player_2.active_player;
  }

  newGame() {
    window.location.reload();
  }

}
