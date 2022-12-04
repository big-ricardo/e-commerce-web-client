import Register from "./index";
import { renderProvider } from "@/test";
import { fireEvent, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { store } from "@/store";
import axios from "axios";

const mock = new MockAdapter(axios);

beforeEach(() => {
  mock.onGet().reply(200, [
    {
      id: 1,
      name: "test",
    },
  ]);

  mock.onPost().reply(200, {
    data: {
      id: 1,
      nome: "Teste",
      email: "",
    },
  });

  mock.reset();
});

describe("Register Component", () => {
  describe("Show components renders", () => {
    it("should render", () => {
      const { getByTestId } = renderProvider(<Register />);
      expect(getByTestId("title-create-user")).toBeInTheDocument();
    });

    it("should render the logo", () => {
      const { getByTestId } = renderProvider(<Register />);
      expect(getByTestId("logo")).toBeInTheDocument();
    });

    it("should render the form", () => {
      const { getByTestId } = renderProvider(<Register />);
      expect(getByTestId("form")).toBeInTheDocument();
    });

    it("should render the inputs", () => {
      const { getByTestId } = renderProvider(<Register />);
      expect(getByTestId("input-name")).toBeInTheDocument();
      expect(getByTestId("input-email")).toBeInTheDocument();
      expect(getByTestId("input-password")).toBeInTheDocument();
      expect(getByTestId("input-password-confirm")).toBeInTheDocument();
      expect(getByTestId("input-street")).toBeInTheDocument();
      expect(getByTestId("input-neighborhood")).toBeInTheDocument();
      expect(getByTestId("input-complement")).toBeInTheDocument();
      expect(getByTestId("input-number")).toBeInTheDocument();
      expect(getByTestId("select-state")).toBeInTheDocument();
      expect(getByTestId("select-city")).toBeInTheDocument();
    });

    it("should render the button", () => {
      const { getByTestId } = renderProvider(<Register />);
      expect(getByTestId("submit-component")).toBeInTheDocument();
    });

    it("should render the link", () => {
      const { getByTestId } = renderProvider(<Register />);
      expect(getByTestId("link-login")).toBeInTheDocument();
    });
  });

  describe("Forms validation", () => {
    describe("Name", () => {
      it("should show error when name is empty if submit button", async () => {
        const { getByTestId, getByText } = renderProvider(<Register />);
        const submitButton = getByTestId("submit-component");

        fireEvent.click(submitButton);

        await waitFor(() => {
          expect(getByText("Por favor preencha seu nome!")).toBeInTheDocument();
        });
      });

      it("should show error when name is empty change if clean", async () => {
        const { getByTestId, getByText } = renderProvider(<Register />);
        const nameInput = getByTestId("input-name");

        fireEvent.change(nameInput, { target: { value: "asdasd" } });
        fireEvent.change(nameInput, { target: { value: "" } });

        await waitFor(() => {
          expect(getByText("Por favor preencha seu nome!")).toBeInTheDocument();
        });
      });
    });

    describe("Email", () => {
      it("should show error when email is empty if submit button", async () => {
        const { getByTestId, getByText } = renderProvider(<Register />);
        const submitButton = getByTestId("submit-component");

        fireEvent.click(submitButton);

        await waitFor(() => {
          expect(
            getByText("Por favor preencha seu email!"),
          ).toBeInTheDocument();
        });
      });

      it("should show error when email is empty change if clean", async () => {
        const { getByTestId, getByText } = renderProvider(<Register />);
        const emailInput = getByTestId("input-email");

        fireEvent.change(emailInput, { target: { value: "asdasd" } });
        fireEvent.change(emailInput, { target: { value: "" } });

        await waitFor(() => {
          expect(
            getByText("Por favor preencha seu email!"),
          ).toBeInTheDocument();
        });
      });

      it("should show error when email is valid", async () => {
        const { getByTestId, queryByText } = renderProvider(<Register />);
        const emailInput = getByTestId("input-email");

        fireEvent.change(emailInput, { target: { value: "email@valido.com.br" } });

        await waitFor(() => {
          expect(
            queryByText("Por favor preencha seu email!"),
          ).toBeNull();
        });
      });
    });

    describe("Password", () => {
      it("should show error when password is empty if submit button", async () => {
        const { getByTestId, getByText } = renderProvider(<Register />);
        const submitButton = getByTestId("submit-component");

        fireEvent.click(submitButton);

        await waitFor(() => {
          expect(
            getByText("Por favor preencha sua senha!"),
          ).toBeInTheDocument();
        });
      });

      it("should show error when password is empty change if clean", async () => {
        const { getByTestId, getByText } = renderProvider(<Register />);
        const passwordInput = getByTestId("input-password");

        fireEvent.change(passwordInput, { target: { value: "asdasd" } });
        fireEvent.change(passwordInput, { target: { value: "" } });

        await waitFor(() => {
          expect(
            getByText("Por favor preencha sua senha!"),
          ).toBeInTheDocument();
        });
      });

      it("should show error when password is less than 6 characters", async () => {
        const { getByTestId, getByText } = renderProvider(<Register />);
        const passwordInput = getByTestId("input-password");

        fireEvent.change(passwordInput, { target: { value: "12345" } });

        await waitFor(() => {
          expect(
            getByText("A senha deve ter no mínimo 6 caracteres!"),
          ).toBeInTheDocument();
        });
      });
    });

    describe("Password Confirm", () => {
      it("should show error when password confirm is empty if submit button", async () => {
        const { getByTestId, getByText } = renderProvider(<Register />);
        const submitButton = getByTestId("submit-component");

        fireEvent.click(submitButton);

        await waitFor(() => {
          expect(
            getByText("Por favor preencha sua senha!"),
          ).toBeInTheDocument();
        });
      });

      it("should show error when password confirm is empty change if clean", async () => {
        const { getByTestId, getByText } = renderProvider(<Register />);
        const passwordConfirmInput = getByTestId("input-password-confirm");

        fireEvent.change(passwordConfirmInput, { target: { value: "asdasd" } });
        fireEvent.change(passwordConfirmInput, { target: { value: "" } });

        await waitFor(() => {
          expect(
            getByText("Por favor confirme sua senha!"),
          ).toBeInTheDocument();
        });
      });

      it("should show error when password confirm is different from password", async () => {
        const { getByTestId, getByText } = renderProvider(<Register />);
        const passwordInput = getByTestId("input-password");
        const passwordConfirmInput = getByTestId("input-password-confirm");

        fireEvent.change(passwordInput, { target: { value: "123456" } });
        fireEvent.change(passwordConfirmInput, {
          target: { value: "1234567" },
        });

        await waitFor(() => {
          expect(
            getByText("As senhas não coincidem, por favor verifique!"),
          ).toBeInTheDocument();
        });
      });
    });

    describe("Address", () => {
      describe("Street", () => {
        it("should show error when street is empty change if clean", async () => {
          const { getByTestId, getByText } = renderProvider(<Register />);
          const streetInput = getByTestId("input-street");

          fireEvent.change(streetInput, { target: { value: "asdasd" } });
          fireEvent.change(streetInput, { target: { value: "" } });

          await waitFor(() => {
            expect(
              getByText("Preencha a rua e o numero do endereço."),
            ).toBeInTheDocument();
          });
        });
      });
    });

    describe("Neighborhood", () => {
      it("should show error when neighborhood is empty change if clean", async () => {
        const { getByTestId, getByText } = renderProvider(<Register />);
        const neighborhoodInput = getByTestId("input-neighborhood");

        fireEvent.change(neighborhoodInput, { target: { value: "asdasd" } });
        fireEvent.change(neighborhoodInput, { target: { value: "" } });

        await waitFor(() => {
          expect(getByText("Preencha seu bairro.")).toBeInTheDocument();
        });
      });
    });

    describe("Number", () => {
      it("should show error when number is empty change if clean", async () => {
        const { getByTestId, getByText } = renderProvider(<Register />);
        const numberInput = getByTestId("input-number");

        fireEvent.change(numberInput, { target: { value: "asdasd" } });
        fireEvent.change(numberInput, { target: { value: "" } });

        await waitFor(() => {
          expect(
            getByText("Preencha o numero do endereço."),
          ).toBeInTheDocument();
        });
      });
    });

    describe("Zip-Code", () => {
      it("should show error when zip-code is empty change if clean", async () => {
        const { getByTestId, getByText } = renderProvider(<Register />);
        const zipCodeInput = getByTestId("input-zipCode");

        fireEvent.change(zipCodeInput, { target: { value: "asdasd" } });
        fireEvent.change(zipCodeInput, { target: { value: "" } });

        await waitFor(() => {
          expect(getByText("Preencha seu CEP.")).toBeInTheDocument();
        });
      });
    });
  });

  describe("Action Reducer", () => {
    describe("Register", () => {
      it("should register user", async () => {
        const { getByTestId, queryByText } = renderProvider(<Register />);
        const nameInput = getByTestId("input-name");
        const emailInput = getByTestId("input-email");
        const passwordInput = getByTestId("input-password");
        const passwordConfirmInput = getByTestId("input-password-confirm");
        const submitButton = getByTestId("submit-component");

        fireEvent.change(nameInput, { target: { value: "Nome Valido" } });
        fireEvent.change(emailInput, { target: { value: "email@valido.com" } });
        fireEvent.change(passwordInput, { target: { value: "1234567" } });
        fireEvent.change(passwordConfirmInput, {
          target: { value: "1234567" },
        });
        fireEvent.click(submitButton);

        await waitFor(() => {

          expect(queryByText("Por favor preencha seu nome!")).not.toBeInTheDocument();
          expect(queryByText("Por favor preencha seu email!")).not.toBeInTheDocument();
          expect(queryByText("Por favor preencha sua senha!")).not.toBeInTheDocument();
          expect(queryByText("Por favor confirme sua senha!")).not.toBeInTheDocument();

          expect(mock.history.post).toHaveLength(0);
          const state: any = store.getState().user;
        });
      });
    });
  });
});
