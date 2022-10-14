import React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { styles } from "../style/SendSurvey.Style";
import { useDispatch, useSelector } from "react-redux";
import { newConfig } from "../../store/parameters";

const ConfigSurvey = () => {
  const dispatch = useDispatch();
  const parameters = useSelector((state) => state.parameters);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      stack: parameters.stack,
      intervalo: parameters.intervalo,
    },
  });

  const onSubmit = (data) => {
    dispatch(newConfig(data));
  };

  return (
    <View>
      <Text style={styles.label}>Cantidad de envios simultaneos</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            // defaultValue={parameters.stack}
          />
        )}
        name="stack"
        rules={{ required: true, min: 1, max: 100 }}
      />
      {errors.stack && (
        <Text style={styles.labelError}>Verifique nuevamente los campos.</Text>
      )}

      <Text style={styles.label}>
        Intervalo de tiempo entre cada tanda (min: 1 minuto max: 59 minutos)
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            // defaultValue={parameters.intervalo}
          />
        )}
        name="intervalo"
        rules={{ required: true, min: 1, max: 59 }}
      />
      {errors.intervalo && (
        <Text style={styles.labelError}>Verifique nuevamente los campos.</Text>
      )}

      <View style={styles.button}>
        <Button
          style={styles.buttonInner}
          color
          title="Guardar configuracion"
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <View>
        <Text>Informacion adicional:</Text>
        <Text>
          El servidor de correos que se esta utilizando es SendGrid API. Su plan
          gratuito permite un envio de 100 correos por día.
        </Text>
      </View>
    </View>
  );
};

export default ConfigSurvey;
