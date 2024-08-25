package ru.shutovna.moyserf.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.shutovna.moyserf.error.InvalidViewException;
import ru.shutovna.moyserf.payload.response.ApiResponse;
import ru.shutovna.moyserf.service.IViewService;

@RestController
@RequestMapping("/api/views")
@Slf4j
public class ViewController {
    private final IViewService viewService;

    public ViewController(IViewService viewService) {
        this.viewService = viewService;
    }

    @GetMapping("/start-view")
    public ResponseEntity<ApiResponse> startView(@RequestParam int siteId) {
        ViewToken viewToken = viewService.startView(siteId);

        return ResponseEntity.ok()
                .body(new ApiResponse(true, viewToken.getToken()));
    }

    @GetMapping("/end-view")
    public ResponseEntity<ApiResponse> endView(@RequestParam int siteId, @RequestParam String token) {
        try {
            viewService.endView(siteId, token);
            return ResponseEntity.ok()
                    .body(new ApiResponse(true, "Successfully ended view for site " + siteId));
        } catch (InvalidViewException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }


}
