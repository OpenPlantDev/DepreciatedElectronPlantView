import * as React from "react";
import { Id64String, OpenMode } from "@bentley/bentleyjs-core";
import { Range3d } from "@bentley/geometry-core";
import { AccessToken, ConnectClient, IModelQuery, Project, Config } from "@bentley/imodeljs-clients";
import { IModelApp, IModelConnection, FrontendRequestContext, AuthorizedFrontendRequestContext, DrawingViewState, ScreenViewport } from "@bentley/imodeljs-frontend";
import { Presentation, SelectionChangeEventArgs, ISelectionProvider } from "@bentley/presentation-frontend";
import { Button, ButtonSize, ButtonType, Spinner, SpinnerSize } from "@bentley/ui-core";
import { SignIn } from "@bentley/ui-components";
import { SimpleViewerApp } from "../api/SimpleViewerApp";
import PropertiesWidget from "./Properties";
import GridWidget from "./Table";
import TreeWidget from "./Tree";
import ViewportContentControl from "./Viewport";
import "@bentley/icons-generic-webfont/dist/bentley-icons-generic-webfont.css";
import "./App.css";

const remote = require("electron").remote;
const BrowserWindow = remote.BrowserWindow;
const win = new BrowserWindow({
    width: 800,
    height: 600,
    center: true,
    resizable: false,
    frame: true,
    transparent: false,
});

interface IModelComponentsProps {
  imodel: IModelConnection;
  viewDefinitionId: Id64String;
}

class PopupWindow extends React.PureComponent<IModelComponentsProps> {
  public render() {
    // ID of the presentation ruleset used by all of the controls; the ruleset
    // can be found at `assets/presentation_rules/Default.PresentationRuleSet.xml`
    const rulesetId = "Default";
    return (
      <div className="app-content">
        <div className="top">
          <ViewportContentControl imodel={this.props.imodel} rulesetId={rulesetId} viewDefinitionId={this.props.viewDefinitionId} />
        </div>
        <div className="left">
          <div className="bottom">
          <Button title="Select" id="Select iModel" onClick = {/* */}>Select</Button>
          </div>
        </div>
        <div className="right">
          <div className="bottom">
            <Button title="Close" id="Close" onClick = {/* */}>Close</Button>
          </div>
        </div>
      </div>
    );
  }
}
export class NgbdModalContent {
  @Input() public name;
  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: "ngbd-modal-component",
  templateUrl: "./modal-component.html",
})
export class NgbdModalComponent {
  constructor(private modalService: NgbModal) {}

  public open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = "World";
  }
}
