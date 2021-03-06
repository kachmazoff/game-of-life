import React from "react";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { actions } from "@/modules/Widgets/reducer";
import {
  GameOfLife,
  BetWindow,
  HeightStatistics,
  AccessChecker,
} from "@/modules";

import { PageHeader, StyledNavLink, H1, Links } from "./styled";

const GameWrapper = styled.div`
  max-width: 55%;
  margin: 0 auto;
`;

export const GamePage = ({ match }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      actions.addCurrentPageWidget({
        id: "game#filled",
        widget: "FilledPercentStatistics",
      })
    );
    dispatch(
      actions.addCurrentPageWidget({
        id: "game#size",
        widget: "SizeWidget",
      })
    );
    dispatch(
      actions.addCurrentPageWidget({
        id: "game#params",
        widget: "GameParamsWidget",
      })
    );
    dispatch(
      actions.addCurrentPageWidget({
        id: "game#process",
        widget: "GameProcessWidget",
      })
    );

    return () => dispatch(actions.clearPageWidgets());
  }, []);

  return (
    <AccessChecker>
      <div>
        <PageHeader>
          <H1>Game</H1>
          <Links>
            <StyledNavLink exact to={`${match.url}`}>
              Игра
            </StyledNavLink>
            <StyledNavLink to={`${match.url}/statistics`}>
              Статистика
            </StyledNavLink>
            <StyledNavLink exact to="/">
              На главную
            </StyledNavLink>
          </Links>
        </PageHeader>
        <GameWrapper>
          <Switch>
            <Route exact path={`${match.url}`} component={GameOfLife} />
            <Route
              path={`${match.url}/statistics`}
              component={HeightStatistics}
            />
          </Switch>
        </GameWrapper>
        <BetWindow />
      </div>
    </AccessChecker>
  );
};
