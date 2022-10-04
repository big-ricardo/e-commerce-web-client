import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { Link, Navigate } from "react-router-dom";
import { UserLogin } from "@/interfaces/user";
import { useDispatch, useSelector } from "react-redux";
import { login, resetStatus } from "../../store/user/actions";
import { memo, useEffect } from "react";
import { requestStatus } from "@/interfaces/interfaces";
import toastr from "toastr";

import Submit from "../../components/atom/submit";
import Logo from "../../components/atom/logo";

const LoginComponent: React.FC = () => {
  const dispatch = useDispatch();

  const requestLogin: requestStatus = useSelector(
    (state: any) => state.user.status.login,
  );

  const user: UserLogin = useSelector((state: any) => state.user.data);

  const onFinish = (values: UserLogin) => {
    dispatch(login(values));
  };

  useEffect(() => {
    if (requestLogin.success) {
      toastr.success("Login realizado com sucesso!");
      dispatch(resetStatus());
    }

    if (requestLogin.error) {
      toastr.error("Error", requestLogin.error);
      dispatch(resetStatus());
    }
  }, [requestLogin]);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="bg-blue-100 p-10 rounded-r-xl shadow-xl">
        <div className="flex justify-center items-center mb-10">
          <h1 className="text-indigo-500 text-3xl">Entrar</h1>
          <div>
            <Logo />
          </div>
        </div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Por favor preencha seu email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
              className="h-10 rounded"
              type="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Por favor preencha sua senha!" },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Senha"
              size="large"
            />
          </Form.Item>

          <Submit loading={requestLogin.loading} text="Entrar" />
          <p>
            <strong className="text-indigo-500">Ou</strong>{" "}
            <Link to="/register">crie uma conta</Link>
          </p>
        </Form>
      </div>
      {!!user && <Navigate to="/" replace />}
    </div>
  );
};

export default memo(LoginComponent);
