import React from "react";
import { inject, observer } from "mobx-react";
import {
  Text,
  Stack,
  TextField,
  ActionButton,
  Dropdown,
  PrimaryButton,
  Checkbox,
  Dialog,
  DialogFooter,
  DefaultButton,
  Separator
} from "office-ui-fabric-react";
import queryString from "query-string";

@inject("profileFormStore")
@observer
export default class Form extends React.Component {
  constructor(props) {
    const { action } = queryString.parse(location.search);
    super(props);
    this.state = {
      formal_name: "",
      informal_name: "",
      phone_number: "",
      mobile_number: "",
      email: "",
      work_function: "",
      department: "",
      establishment: "",
      extra_text: "",
      whatsapp: "",
      working_days: "",
      opening_hours: "",
      editing: false,
      showDeletePrompt: false,
      action
    };
  }

  handleFormData(data) {
    const { profileFormStore } = this.props;
    profileFormStore.putProfile(data, () => {});
  }

  enableEditing = () => {
    this.setState({ editing: true });
  };

  saveEdit = () => {
    this.setState({ editing: false });
    // TODO: update profile from here
  };

  cancelEdit = () => {
    this.setState({ editing: false });
    // TODO: revert to old values
  };

  showDeletePrompt = () => {
    this.setState({ showDeletePrompt: true });
  };

  deleteProfile = () => {
    const { profileFormStore } = this.props;
    const { id } = queryString.parse(location.search);
    profileFormStore.deleteProfile(id, (error, response) => {
      this.closePrompt();
      Office.context.ui.messageParent(
        JSON.stringify({ messageType: "profileDeleted" })
      );
    });
  };

  createProfile = () => {
    const { profileFormStore } = this.props;
    const {
      formal_name,
      informal_name,
      phone_number,
      mobile_number,
      email,
      work_function,
      department,
      establishment,
      extra_text
    } = this.state;
    const profileData = {
      formal_name,
      informal_name,
      phone_number,
      mobile_number,
      email,
      work_function,
      department,
      establishment,
      extra_text
    };
    profileFormStore.putProfile(profileData, (error, response) => {
      if (error) {
        return;
      }
      Office.context.ui.messageParent(
        JSON.stringify({ messageType: "profileCreated" })
      );
    });
  };

  closePrompt = () => {
    this.setState({ showDeletePrompt: false });
  };

  closeDialog = () => {
    Office.context.ui.messageParent(JSON.stringify({ messageType: "close" }));
  };

  renderHeader = () => {
    const { action, editing } = this.state;
    const showHeaderButtons = action === "view";
    return (
      <Stack horizontal horizontalAlign="space-between">
        <Text variant="xLarge">Persoonlijke instellingen</Text>
        {showHeaderButtons ? (
          <div>
            <ActionButton
              iconProps={{ iconName: "Delete" }}
              onClick={this.showDeletePrompt}
            >
              Verwijderen
            </ActionButton>
            <ActionButton
              iconProps={{ iconName: "EditContact" }}
              onClick={editing ? this.cancelEdit : this.enableEditing}
            >
              {editing ? "Aanpassen stoppen" : "Aanpassen"}
            </ActionButton>
          </div>
        ) : null}
      </Stack>
    );
  };

  renderDeleteDialog = () => {
    return (
      <Dialog
        hidden={false}
        onDismiss={this.closePrompt}
        dialogContentProps={{
          title: "Weet je zeker dat je dit profiel wilt verwijderen?",
          subText: "Dit is onomkeerbaar"
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={this.deleteProfile} text="Verwijderen" />
          <DefaultButton onClick={this.closePrompt} text="Cancel" />
        </DialogFooter>
      </Dialog>
    );
  };

  renderLeftPanel = enabled => {
    return (
      <Stack vertical tokens={{ childrenGap: 5, padding: 5 }}>
        <TextField
          label="Naam (formeel)"
          required
          value={this.state.formal_name}
          onChange={event => this.setState({ formal_name: event.target.value })}
          styles={{ root: { minWidth: 300 } }}
          disabled={!enabled}
        />
        <TextField
          label="Naam (informeel)"
          value={this.state.informal_name}
          onChange={event =>
            this.setState({ informal_name: event.target.value })
          }
          styles={{ root: { minWidth: 300 } }}
          disabled={!enabled}
        />
        <TextField
          label="Persoonlijk telefoonnummer (10 cijfers)"
          value={this.state.phone_number}
          onChange={event =>
            this.setState({ phone_number: event.target.value })
          }
          styles={{ root: { minWidth: 300 } }}
          disabled={!enabled}
        />
        <TextField
          label="Persoonlijk mobielnummer (10 cijfers)"
          value={this.state.mobile_number}
          onChange={event =>
            this.setState({ mobile_number: event.target.value })
          }
          styles={{ root: { minWidth: 300 } }}
          disabled={!enabled}
        />
        <TextField
          label="Extra tekst (bijv. Vragen?)"
          value={this.state.extra_text}
          onChange={event => this.setState({ extra_text: event.target.value })}
          styles={{ root: { minWidth: 300 } }}
          disabled={!enabled}
        />
        <TextField
          label="WhatsApp"
          value={this.state.whatsapp}
          onChange={event => this.setState({ whatsapp: event.target.value })}
          styles={{ root: { minWidth: 300 } }}
          disabled={!enabled}
        />
      </Stack>
    );
  };

  renderRightPanel = enabled => {
    return (
      <Stack vertical tokens={{ childrenGap: 5, padding: 5 }}>
        <TextField
          label="Persoonlijk e-mailadres"
          value={this.state.email}
          onChange={event => this.setState({ email: event.target.value })}
          styles={{ root: { minWidth: 300 } }}
          disabled={!enabled}
        />
        <Dropdown
          placeholder="Selecteer een optie"
          label="Functie"
          options={[
            { key: 0, text: "Assistent procesmanager" },
            { key: 1, text: "Assistent procesmanager" },
            { key: 2, text: "Assistent procesmanager" },
            { key: 3, text: "Assistent procesmanager" },
            { key: 4, text: "Assistent procesmanager" }
          ]}
          onChange={(event, option) => {
            this.setState({ work_function: option.text });
          }}
          styles={{ dropdown: { width: 300 } }}
          disabled={!enabled}
        />
        <Dropdown
          placeholder="Selecteer een optie"
          label="Afdeling"
          options={[{ key: 0, text: "CZ directie" }]}
          value={this.state.department}
          onChange={(event, option) => {
            this.setState({ department: option.text });
          }}
          styles={{ dropdown: { width: 300 } }}
          disabled={!enabled}
        />
        <Dropdown
          placeholder="Selecteer een optie"
          label="Vestiging"
          value={this.state.establishment}
          onChange={(event, option) => {
            this.setState({ establishment: option.text });
          }}
          options={[{ key: 0, text: "Factuuradres Haarlem CA" }]}
          styles={{ dropdown: { width: 300 } }}
          disabled={!enabled}
        />
        <TextField
          label="Werkdagen"
          value={this.state.working_days}
          onChange={event =>
            this.setState({ working_days: event.target.value })
          }
          styles={{ root: { minWidth: 300 } }}
          disabled={!enabled}
        />
        <TextField
          label="Openingstijden"
          value={this.state.opening_hours}
          onChange={event =>
            this.setState({ opening_hours: event.target.value })
          }
          styles={{ root: { minWidth: 300 } }}
          disabled={!enabled}
        />
      </Stack>
    );
  };

  renderFooter = () => {
    const { action, editing } = this.state;
    return (
      <Stack vertical tokens={{ childrenGap: ".3em" }}>
        <Separator />
        <Stack>
          <Stack.Item align="end">
            <Stack horizontal tokens={{ childrenGap: "8px" }}>
              {editing ? (
                <PrimaryButton
                  text="Aanpassingen opslaan"
                  onClick={this.saveEdit}
                />
              ) : null}
              {action === "create" ? (
                <PrimaryButton text="Opslaan" onClick={this.createProfile} />
              ) : null}
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
    const { showDeletePrompt, action, editing } = this.state;
    const enabled = editing || action === "create";
    return (
      <div>
        {showDeletePrompt ? this.renderDeleteDialog() : null}
        <Stack vertical tokens={{ childrenGap: 5 }}>
          {this.renderHeader()}
          <Stack horizontal tokens={{ childrenGap: 5 }}>
            {this.renderLeftPanel(enabled)}
            {this.renderRightPanel(enabled)}
          </Stack>
          {this.renderFooter()}
        </Stack>
      </div>
    );
  }
}
