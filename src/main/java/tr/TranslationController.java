package tr;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TranslationController {

	@RequestMapping("/api/list")
	@ResponseBody
	public List<TranslationDto> list(@RequestBody SearchFilter filter) {
		List<TranslationDto> result = new ArrayList<>();
		for (int i = 1; i< 15; i++) {
			TranslationDto t = new TranslationDto();
			t.setId(i);
			t.setKey("key " + i);
			t.setLang(1);
			t.setTranslation("trans " + i);
			t.setDate(new Date().getTime());
			t.setModifiedBy("RL78794");
			result.add(t);
		}
		return result;
	}

	@RequestMapping("/api/update")
	@ResponseBody
	public List<TranslationDto> update(@RequestBody List<TranslationDto> translations) {
		System.out.println("updating,,," + translations);
		return translations;
	}
	
}
