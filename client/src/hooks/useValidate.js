const useValidate = () => {
  function validator({
    form,
    formGroupSelector,
    errorSelector,
    rules,
    onSubmit,
  }) {
    let formElement = document.querySelector(form);
    //get parent (form group)
    function getParent(child, selector) {
      while (child.parentElement) {
        if (child.parentElement.matches(selector)) {
          return child.parentElement;
        }
        child = child.parentElement;
      }
    }
    //validate function
    function validate(inputElement, rule) {
      const formGroup = getParent(inputElement, formGroupSelector);
      const formMessage = formGroup.querySelector(errorSelector);
      let errorMessage = rule.test(inputElement.value);
      if (errorMessage) {
        formGroup.classList.add("invalid");
        formMessage.innerText = errorMessage;
      } else {
        formGroup.classList.remove("invalid");
        formMessage.innerText = "";
      }
      return !errorMessage;
    }

    if (formElement) {
      formElement.onsubmit = (e) => {
        e.preventDefault();
        let isFormValid = true;
        rules.forEach((rule) => {
          let inputElement = document.querySelector(rule.selector);
          let isValid = validate(inputElement, rule);
          if (!isValid) {
            isFormValid = false;
          }
        });
        if (isFormValid) {
          if (typeof onSubmit === "function") {
            var formEnableInputs = formElement.querySelectorAll(
              "[name]:not([disabled])"
            );
            var formValues = Array.from(formEnableInputs).reduce(function (
              values,
              input
            ) {
              values[input.name] = input.value;
              return values;
            },
            {});
            onSubmit({ formValues });
          }
        }
      };
    }
  }

  //rules
  validator.onsubmit = (data) => {
    console.log(data);
  };
  validator.isRequired = (selector, msg) => {
    return {
      selector,
      test(value) {
        return value.trim() === ""
          ? msg || "Vui lòng nhập trường này"
          : undefined;
      },
    };
  };
  validator.minLength = (selector, min, msg) => {
    return {
      selector,
      test(value) {
        return value.length > min
          ? undefined
          : msg || `Vui lòng nhập tối thiểu ${min} ký tự.`;
      },
    };
  };
  validator.isEmail = (selector, msg) => {
    return {
      selector,
      test(value) {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(value)
          ? undefined
          : msg || "Vui lòng nhập email hợp lệ";
      },
    };
  };
  validator.isConfirmed = (selector, getConfirmValue, msg) => {
    return {
      selector,
      test(value) {
        return value === getConfirmValue()
          ? undefined
          : msg || "Giá trị nhập vào không chính xác.";
      },
    };
  };
  return validator;
};

export default useValidate;
