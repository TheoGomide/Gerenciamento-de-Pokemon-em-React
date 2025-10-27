import '../../shared/styles/Status.css';

function Status() {
  return (
    <div className="main-div">
      <div className="left-div">
        <div className="party-pokemon">
          <img src="../src/sprites/charizard.jpeg" width="200" alt="Charizard" className="pokemon-image" />
          <p><h1>Charizard ♂</h1>Lv.36 <br/> DEX NO.  6</p>
          
          <ul className="left-list">
          </ul>
        </div>
      </div>
      <div className="right-div">
        <ul>
            <h2>STATS</h2>
            <li>HP: 78</li>
            <li>ATTACK: 84</li>
            <li>DEFENSE: 78</li>
            <li>SP.ATK: 109</li>
            <li>SP.DEF: 85</li>
            <li>SPEED: 100</li>

            <h2>MOVES LEARNED</h2>
            <li>Flame burst</li>
            <li>Fire Fang</li>
            <li>Inferno</li>
            <li>Slash</li>
        </ul>
      </div>
    </div>
  );
}

export default Status;
