package tr;

import java.io.Serializable;

public class LanguageDto implements Serializable {

	private static final long serialVersionUID = -4047187147298093738L;
	private int id;
	private String name;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
