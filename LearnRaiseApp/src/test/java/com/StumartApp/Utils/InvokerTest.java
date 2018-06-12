package com.StumartApp.Utils;

import junit.framework.TestCase;

import java.util.Arrays;
import java.util.List;

public class InvokerTest extends TestCase {
    private Invoker invoker = Invoker.getInstances();

    public void testIsEmail() {
        String email = this.invoker.emailFilter("kianbomba@gmail.com");
        this.assertTrue(this.invoker.isEmail(email));
    }

    public void testIsEmailFail() {
        String email = this.invoker.emailFilter("hellowolrd!#@gmail.com");
        this.assertFalse(this.invoker.isEmail(email));
    }

    public void testRetrieveToken() {
        String token = this.invoker.generatedToken();
        System.out.printf("\n\n\n %s \n\n\n", token);
        this.assertTrue(true);
    }

    public void testEncryptionToken() {
        String txt = "Cubicuibap123";
        this.assertEquals("f0aaac1bf459d4088855a8eb4daa38c4", this.invoker.encrypt(txt));
    }

    public void testEncrypPassword() {
        String txt = "Cubideptrai123";
        this.assertEquals("62471f5f91c0243b47a98ea8fe341433", this.invoker.encrypt(txt));
    }

    public void testStringFilter() {
        String txt = "abcd' \" &";
        this.assertEquals("abcd&apos; &quot; &amp;", this.invoker.stringFilter(txt));
    }

    public void testCheckSpecialCharacter() {
        String txt = "Abcd";
        this.assertTrue(this.invoker.checkSpecialCharacters(txt));
    }

    public void testCheckSpecialCharacterFalseCase() {
        String text = "abcd'@!";
        this.assertFalse(this.invoker.checkSpecialCharacters(text));
    }

    public void testIsNumber() {
        String text = "1";
        this.assertTrue(this.invoker.isNumber(text));
    }

    public void testIsNumberFalseCase() {
        String text = "A";
        this.assertFalse(this.invoker.isNumber(text));
    }

    public void testBase64Encode() {
        String txt = "YQ==";
        this.assertEquals(txt, this.invoker.base64Encode("a"));
    }

    public void testBase64Decode() {
        String txt = "a";
        this.assertEquals(txt, this.invoker.base64Decode("YQ=="));
    }

    public void testCheckString() {
        this.assertTrue(this.invoker.checkString("a"));
    }

    public void testCheckStringFalseCase() {
        this.assertFalse(this.invoker.checkString(""));
    }

    public void testCheckObject() {
        this.assertTrue(this.invoker.checkObject("A"));
    }

    public void testCheckObjectFalseCase() {
        this.assertFalse(this.invoker.checkObject(null));
    }

    public void testParseValue() {
        this.assertTrue(this.invoker.parseValue(1));
    }

    public void testParseValueFalseCase() {
        this.assertFalse(this.invoker.parseValue(0));
    }

    public void testCheckNullParams() {
        this.assertTrue(this.invoker.checkNullParams(Arrays.asList("1", "2" , "3", "Abc", "d")));
    }

    public void testCheckNullParamsFalseCase() {
        this.assertFalse(this.invoker.checkNullParams(Arrays.asList(null, null, null)));
    }
}
