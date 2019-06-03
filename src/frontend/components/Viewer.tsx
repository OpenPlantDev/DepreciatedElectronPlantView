/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { IModelConnection } from "@bentley/imodeljs-frontend";
import { Button } from "@bentley/ui-core";

/** React properties for the viewer component, that accepts an iModel connection with ruleset id */
export interface IModelConnectionProps {
  /** iModel whose contents should be displayed in the viewer */
  imodel: IModelConnection;
  /** ID of the presentation rule set to use for creating the hierarchy in the viewer */
  rulesetId: string;
}

/** React properties for the viewer component, that accepts a data provider */
export interface DataProviderProps {

}

/** React properties for the viewer component */
export type Props = IModelConnectionProps | DataProviderProps;

/** Viewer component for the viewer app */
export default class SimpleViewerComponent extends React.PureComponent<Props> {
  public render() {
    return (
      <>
      <Button title="Select New Viewer" id="Select New Viewer" onClick={this.onClick}>Select New Viewer</Button>
      </>
    );
  }
  public onClick() {

  }
}
