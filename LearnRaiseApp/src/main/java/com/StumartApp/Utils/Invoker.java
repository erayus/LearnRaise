package com.StumartApp.Utils;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.tomcat.util.codec.binary.Base64;

import javax.validation.constraints.NotNull;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Invoker {
    private static Invoker _inner;
    private char[] all_special_characters = {
            '*', '#', '!', '~', '`', '$', '^', '%', '&', '(', ')', '[', ']', '{', '}',
            '|', '\\', ':', ';', '>', '<', '/', ',', '?'
    };

    private Invoker() {
    }

    /**
     * @return
     */
    @NotNull
    public static Invoker getInstances() {
        if (Invoker._inner == null) {
            _inner = new Invoker();
        }
        return _inner;
    }

    /**
     * @param input
     * @return
     */
    public int numberFilter(String input) {
        int the_number = 0;
        if (!input.equals("") || input != null) {
            if (this.checkSpecialCharacters(input) && this.isNumber(input)) {
                the_number = Integer.parseInt(input);
            }
        }
        return the_number;
    }

    public String stringFilter(String input) {
        String new_input = StringEscapeUtils.escapeHtml(input);
        new_input = new_input.replaceAll("'", "&apos;");
        return new_input;
    }

    /**
     * @param input
     * @return
     */
    public boolean checkSpecialCharacters(String input) {
        boolean pass = true;
        for (char special : this.all_special_characters) {
            if (input.indexOf(special) > 0) {
                pass = false;
            }
        }
        return pass;
    }

    /**
     * @param input
     * @return
     */
    public boolean isNumber(String input) {
        boolean result = false;
        if (input.matches("[0-9]+")) {
            result = true;
        }
        return result;
    }

    /**
     * @param input
     * @return
     */
    private String md5(String input) {
        String hash = "";
        try {
            MessageDigest md = MessageDigest.getInstance("md5");
            md.update(input.getBytes());
            byte[] bytes = md.digest();
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < bytes.length; i++) {
                builder.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
            }
            hash = builder.toString();
        } catch (NoSuchAlgorithmException nse) {
            System.out.println("\n\n\n There is no such Algorithm \n\n\n");
            nse.printStackTrace();
        }
        return hash;
    }

    /**
     * @param input
     * @return
     */
    public String encrypt(String input) {
        return this.md5(this.md5(this.md5(input)));
    }

    /**
     * @param input
     * @return
     */
    public String base64Encode(String input) {
        byte[] encoded = Base64.encodeBase64(input.getBytes());
        return new String(encoded);
    }

    /**
     * @param input
     * @return
     */
    public String base64Decode(String input) {
        byte[] decoded = Base64.decodeBase64(input.getBytes());
        return new String(decoded);
    }

    public char[] getAllSpecialCharacters() {
        return this.all_special_characters;
    }

    public boolean checkString(String input) {
        return input != null && input != "";
    }

    public boolean checkObject(Object input) {
        return input != null;
    }

    public boolean checkNullParams(List<String> _params) {
        boolean pass = true;
        for (String obj : _params) {
            if (obj == null || obj == "") {
                pass = false;
            }
        }
        return pass;
    }

    public String emailFilter(String email) {
        return this.stringFilter(email);
    }

    public boolean isEmail(String email) {
        String regex = "^(.+)@(.+)$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(email);
        boolean pass = matcher.matches();
        for (char special_char : this.all_special_characters) {
            if (email.indexOf(special_char) > -1) {
                pass = false;
            }
        }
        return pass;
    }

    public boolean parseValue(int tinyInt) {
        return tinyInt == 1;
    }

    public String generatedToken() {
        String token = "",
                phrase = "QWERTYUIOPASDFGHJKLZXCVBNM";
        for (int i = 0; i < 6; i++) {
            Random random = new Random();
            int max = phrase.toCharArray().length;
            int random_nb = random.nextInt((max - 2)) + 1;
            char character = phrase.toCharArray()[random_nb];
            token += character;
        }
        Date date = new Date();
        token += md5(date.toString());
        return token;
    }
}
