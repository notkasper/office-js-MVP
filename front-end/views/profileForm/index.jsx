import React from "react";
import { inject, observer } from "mobx-react";
import {
  Text,
  Stack,
  TextField,
  ActionButton,
  Dropdown,
  PrimaryButton,
  Dialog,
  DialogFooter,
  DefaultButton,
  Separator
} from "office-ui-fabric-react";
import queryString from "query-string";
import { onPhoneError, onEmailError } from "./validations";

@inject("profileFormStore")
@observer
export default class Form extends React.Component {
  constructor(props) {
    super(props);
    const {
      formal_name,
      informal_name,
      phone_number,
      mobile_number,
      email,
      work_function,
      department,
      establishment,
      extra_text,
      action,
      id
    } = queryString.parse(location.search);
    const originalProperties = {
      formal_name,
      informal_name,
      phone_number,
      mobile_number,
      email,
      work_function,
      department,
      establishment,
      extra_text,
      action
    };
    this.state = {
      formal_name,
      informal_name,
      phone_number,
      mobile_number,
      email,
      work_function,
      department,
      establishment,
      extra_text,
      action,
      whatsapp: "",
      working_days: "",
      opening_hours: "",
      editing: false,
      showDeletePrompt: false,
      error: false,
      id
    };
  }

  componentDidMount() {
    const { profileFormStore } = this.props;
    profileFormStore.getEstablishments();
    profileFormStore.getDepartments();
    profileFormStore.getWorkFunctions();
  }

  enableEditing = () => {
    this.setState({ editing: true });
  };

  saveEdit = () => {
    const { profileFormStore } = this.props;
    this.setState({ editing: false });
    const {
      formal_name,
      informal_name,
      phone_number,
      mobile_number,
      email,
      work_function,
      department,
      establishment,
      extra_text,
      action,
      id
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
      extra_text,
      action
    };

    profileFormStore.updateProfile(id, profileData, (error, response) => {
      if (error) {
        return;
      }
      Office.context.ui.messageParent(
        JSON.stringify({ messageType: "profileUpdated" })
      );
    });
  };

  cancelEdit = () => {
    const { originalProperties } = this.state;
    this.setState({ editing: false, ...originalProperties });
  };

  showDeletePrompt = () => {
    this.setState({ showDeletePrompt: true });
  };

  validate = () => this.state.formal_name && !this.error;

  deleteProfile = () => {
    const { profileFormStore } = this.props;
    const { id } = this.state;
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
              iconProps={{ iconName: editing ? "UserRemove" : "EditContact" }}
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
      <Stack
        vertical
        tokens={{ childrenGap: 5, padding: 5 }}
        styles={{ root: { width: "50%" } }}
      >
        <TextField
          label="Naam (formeel)"
          required
          value={this.state.formal_name}
          onChange={event => this.setState({ formal_name: event.target.value })}
          disabled={!enabled}
          styles={{ root: { minWidth: "15rem" } }}
        />
        <TextField
          label="Naam (informeel)"
          value={this.state.informal_name}
          onChange={event =>
            this.setState({ informal_name: event.target.value })
          }
          disabled={!enabled}
        />
        <TextField
          label="Persoonlijk telefoonnummer (10 cijfers)"
          value={this.state.phone_number}
          onChange={event =>
            this.setState({ phone_number: event.target.value })
          }
          disabled={!enabled}
          onGetErrorMessage={value => onPhoneError({ phone_number: value })}
        />
        <TextField
          label="Persoonlijk mobielnummer (10 cijfers)"
          value={this.state.mobile_number}
          onChange={event =>
            this.setState({ mobile_number: event.target.value })
          }
          disabled={!enabled}
          onGetErrorMessage={value => onPhoneError({ phone_number: value })}
        />
        <TextField
          label="Extra tekst"
          value={this.state.extra_text}
          onChange={event => this.setState({ extra_text: event.target.value })}
          disabled={!enabled}
        />
      </Stack>
    );
  };

  renderRightPanel = enabled => {
    const { profileFormStore } = this.props;
    return (
      <Stack
        vertical
        tokens={{ childrenGap: 5, padding: 5 }}
        styles={{ root: { width: "50%" } }}
      >
        <TextField
          label="Persoonlijk e-mailadres"
          value={this.state.email}
          onChange={event => this.setState({ email: event.target.value })}
          disabled={!enabled}
          onGetErrorMessage={value =>
            value.length ? onEmailError({ email: value }) : ""
          }
        />
        <Dropdown
          placeholder="Selecteer een optie"
          label="Functie"
          defaultSelectedKey={this.state.work_function}
          onChange={(event, option) => {
            this.setState({ work_function: option.key });
          }}
          options={profileFormStore.workFunctions.map(workFunction => ({
            key: workFunction.id,
            text: workFunction.name
          }))}
          disabled={!enabled}
        />
        <Dropdown
          placeholder="Selecteer een optie"
          label="Afdeling"
          defaultSelectedKey={this.state.department}
          onChange={(event, option) => {
            this.setState({ department: option.key });
          }}
          options={profileFormStore.departments.map(department => ({
            key: department.id,
            text: department.name
          }))}
          disabled={!enabled}
        />
        <Dropdown
          placeholder="Selecteer een optie"
          label="Vestiging"
          defaultSelectedKey={this.state.establishment}
          onChange={(event, option) =>
            this.setState({ establishment: option.key })
          }
          options={profileFormStore.establishments.map(establishment => ({
            key: establishment.id,
            text: establishment.name
          }))}
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
                <PrimaryButton
                  text="Opslaan"
                  onClick={this.validate && this.createProfile}
                />
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
      <React.Fragment>
        {showDeletePrompt ? this.renderDeleteDialog() : null}
        <Stack vertical tokens={{ childrenGap: 5 }}>
          {this.renderHeader()}
          <Stack horizontal tokens={{ childrenGap: 5 }}>
            {this.renderLeftPanel(enabled)}
            {this.renderRightPanel(enabled)}
          </Stack>
          {this.renderFooter()}
        </Stack>
      </React.Fragment>
    );
  }
}
