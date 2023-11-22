import './Party.css'


function Party() {
    return (
        <html>
            <head>
                    <meta charset="utf-8" />
                    <meta name="ABP" content="ABP"/>
                        <title>
                            ABP
                        </title>
                    </head>

                    <body>
                        <div class="main-div">
                            <div class="left-div">
                                <div class="party-pokemon" >
                                    <img src="../sprites/charizard.jpeg" width="300"/>
                                        <p text>Charizard</p>
                                </div>
                                <div class="party-pokemon" >
                                    <img width="300"/>
                                        <p text>Pokemon 2</p>
                                </div>
                                <div class="party-pokemon" >
                                    <img width="300"/>
                                        <p text>Pokemon 3</p>
                                </div>
                            </div>
                            <div class="right-div">
                                <div class="party-pokemon" >
                                    <img width="300"/>
                                        <p text>Pokemon 4</p>
                                </div>
                                <div class="party-pokemon" >
                                    <img width="300"/>
                                        <p text>Pokemon 5</p>
                                </div>
                                <div class="party-pokemon" >
                                    <img width="300"/>
                                        <p text>Pokemon 6</p>
                                </div>
                            </div>
                        </div>
                    </body>
                </html>
                );
}

                export default Party;