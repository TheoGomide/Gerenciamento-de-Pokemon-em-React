import '../CSS/status.css';

function Status() {
  return (
    <div className="main-div">
      <div className="left-div">
        <div className="party-pokemon">
          <h1>Charizard</h1>
          <p className="principal">Lv.12</p>
          <ul className="left-list">
            <li>DEX NO</li>
            <li>HP</li>
            <li>ATTACK</li>
            <li>DEFENSE</li>
            <li>SP.ATK</li>
            <li>SP.DEF</li>
            <li>SPEED</li>
            <li>NATURE</li>
            <li>ABILITY</li>
            <li>ITEM</li>
          </ul>
        </div>
      </div>
      <div className="right-div">
        <img src="../images/charizard.jpeg" width="300" alt="Charizard" className="pokemon-image" />
        <ul>
            <li>-</li>
            <li>78</li>
            <li>84</li>
            <li>78</li>
            <li>109</li>
            <li>85</li>
            <li>100</li>
            <li>Bold</li>
            <li>Blaze</li>
            <li>-</li>

          <div className="infdir">
            <h2>MOVES LEARNED</h2>
            <ul>
            <li>Flame burst</li>
            <li>Fire Fang</li>
            <li>Inferno</li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Status;
