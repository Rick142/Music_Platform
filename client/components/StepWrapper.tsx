import {
  Container,
  StepLabel,
  Stepper,
  Step,
  Grid,
  Card,
} from "@material-ui/core";
import React, {JSXElementConstructor, ReactElement } from "react";

interface StepWrapperProps {
  activeStep: number;
  children: ReactElement<any, string | JSXElementConstructor <any>>
}
const steps = ["Информация о треке", "Загрузите обложку", "Загрузите трек"];
const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children }) => {
  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={index} completed={activeStep > index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid
        container
        justifyContent="center"
        style={{ margin: "70px 0", height: 270 }}
      >
        <Card style={{ width: 600 }}>{children}</Card>
      </Grid>
    </Container>
  );
};

export default StepWrapper;
