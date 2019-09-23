import React from "react";
import { inject, observer } from "mobx-react";
import {
  Stack,
  Dropdown,
  TextField,
  Icon,
  Separator,
  DatePicker,
  Text,
  DefaultButton,
  Checkbox
} from "office-ui-fabric-react";

@inject("letterFormStore")
@observer
export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  closeDialog = () => {
    Office.context.ui.messageParent(
      JSON.stringify({ messageType: "closeDialog" })
    );
  };

  renderLeftPanel = () => {
    const { letterFormStore } = this.props;
    return (
      <Stack vertical styles={{ root: { width: 400 } }}>
        <Dropdown
          label="Verzendoptie"
          options={letterFormStore.sendOptions}
          disabled
        />
        <TextField label="Adres" multiline rows={6} resizable={false} />
        <DatePicker placeholder="Selecteer datum" label="Kies een datum" />
        <Dropdown
          label="Contactpersoon"
          options={letterFormStore.contacts}
          disabled
        />
        <TextField label="Ons kenmerk" />
        <TextField label="Onderwerp" />
      </Stack>
    );
  };

  renderRightPanel = () => {
    const { letterFormStore } = this.props;
    return (
      <Stack vertical styles={{ root: { width: 400 } }}>
        <Stack horizontal tokens={{ childrenGap: "1em" }}>
          <Dropdown
            label="Aanhef"
            options={letterFormStore.salutations}
            disabled={true}
            styles={{ root: { width: 100 } }}
          />
          <TextField label="Naam" styles={{ root: { width: 250 } }} />
        </Stack>
        <Dropdown
          label="Groetregel"
          disabled
          options={letterFormStore.greetings}
        />
        <TextField
          label="Groetregel toevoeging"
          multiline
          rows={2}
          resizable={false}
        />
        <Dropdown
          label="Ondertekenaar"
          options={letterFormStore.signatures}
          disabled={true}
        />
        <TextField label="Bijlage(n)" multiline rows={8} resizable={false} />
      </Stack>
    );
  };

  renderHeader = () => {
    return (
      <Stack vertical tokens={{ childrenGap: ".3em" }}>
        <Stack horizontal>
          <Icon
            iconName="TextDocument"
            styles={{ root: { fontSize: "3em", color: "DodgerBlue" } }}
          />
          <Text
            variant="xxLarge"
            styles={{ root: { color: "DodgerBlue", paddingLeft: ".3em" } }}
          >
            Brief
          </Text>
        </Stack>
        <Separator />
      </Stack>
    );
  };

  renderFooter = () => {
    return (
      <Stack vertical tokens={{ childrenGap: ".3em" }}>
        <Separator />
        <Stack>
          <Stack.Item align="end">
            <Stack horizontal tokens={{ childrenGap: "8px" }}>
              <DefaultButton text="OK" />
              <DefaultButton
                text="Annuleren"
                onClick={this.closeDialog}
                styles={{ paddingLeft: "30px" }}
              />
            </Stack>
          </Stack.Item>
        </Stack>
      </Stack>
    );
  };

  render() {
    return (
      <Stack vertical>
        {this.renderHeader()}
        <Stack horizontal tokens={{ childrenGap: "10px" }}>
          {this.renderLeftPanel()}
          {this.renderRightPanel()}
        </Stack>
        {this.renderFooter()}
      </Stack>
    );
  }
}
