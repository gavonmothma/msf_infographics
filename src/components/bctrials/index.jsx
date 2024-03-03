import { Container, Row, Col } from "react-bootstrap";

// const BlackCatTrialsMissionDetails_CompactWave = require("../../data/json/blackcattrials/BlackCatTrialsMissionDetails_01_CompactWave.json");
const BlackCatTrialsMissionDetails = require("../../data/json/blackcattrials/BlackCatTrialsMissionDetails_01.json");
const characterList = require("../../data/json/characters.json").data;

export const Bctrials = () => {

    return (
        <Container>
            <Row>
                {BlackCatTrialsMissionDetails.MissionDetails.map((eachStage) => {
                    return (
                        <Row>
                            {eachStage.locNameKey}
                            {eachStage.Settings[1].WaveLists[0].Waves.map((eachWave) => {
                                return (
                                    <Row>
                                        {eachWave.Entries.map((toon) => {
                                            let charPortrait = characterList.filter((master) => {
                                                return master.id === toon.hero_id
                                            })
                                            return <Col><img src={charPortrait[0].portrait} alt={charPortrait[0].name} /></Col>
                                        })}
                                    </Row>
                                )
                            })}
                        </Row>
                    )
                })}
            </Row>
        </Container>
    );
};
